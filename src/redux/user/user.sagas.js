import { takeLatest, all, call, put } from "@redux-saga/core/effects";
import UserActionTypes from "./user.types";
import {
	auth,
	googleProvider,
	createUserProfileDocument,
	getCurrentUser,
} from "../../firebase/firebase.utils";
import {
	googleSignInFailure,
	googleSignInSuccess,
	emailSignInSuccess,
	emailSignInFailure,
	signOutSuccess,
	signOutFailure,
	signUpFailure,
	signUpSuccess,
} from "./user.action";

function* signInWithGoogle() {
	try {
		const { user } = yield auth.signInWithPopup(googleProvider);
		const userRef = yield call(createUserProfileDocument, user);
		const userSnapShot = yield userRef.get();
		yield put(
			googleSignInSuccess({ id: userSnapShot.id, ...userSnapShot.data() })
		);
	} catch (error) {
		yield put(googleSignInFailure(error.message));
	}
}

function* signInWithEmail({ payload: { email, password } }) {
	try {
		const { user } = yield auth.signInWithEmailAndPassword(email, password);
		const userRef = yield call(createUserProfileDocument, user);
		const userSnapShot = yield userRef.get();
		yield put(
			emailSignInSuccess({ id: userSnapShot.id, ...userSnapShot.data() })
		);
	} catch (error) {
		yield put(emailSignInFailure(error));
	}
}

function* isUserAuthenticated() {
	try {
		const authUser = yield getCurrentUser();
		if (!authUser) return;
		const userRef = yield call(createUserProfileDocument, authUser);
		const userSnapShot = yield userRef.get();
		yield put(
			emailSignInSuccess({ id: userSnapShot.id, ...userSnapShot.data() })
		);
	} catch (error) {
		yield put(emailSignInFailure(error));
	}
}

function* signUp({ payload: { email, password, displayName } }) {
	try {
		const { user } = yield auth.createUserWithEmailAndPassword(
			email,
			password
		);
		yield put(signUpSuccess({ user, addtionalData: { displayName } }));
	} catch (error) {
		yield put(signUpFailure(error));
	}
}

function* signInAfterSignUp({ payload: { user, addtionalData } }) {
	try {
		const userRef = yield call(
			createUserProfileDocument,
			user,
			addtionalData
		);
		const userSnapShot = yield userRef.get();
		yield put(
			emailSignInSuccess({ id: userSnapShot.id, ...userSnapShot.data() })
		);
	} catch (error) {
		yield put(signUpFailure(error));
	}
}

function* signOut() {
	try {
		yield auth.signOut();
		yield put(signOutSuccess());
	} catch (error) {
		yield put(signOutFailure(error));
	}
}

function* onEmailSignInStart() {
	yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

function* onGoogleSignInStart() {
	yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

function* checkUserSession() {
	yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

function* onSignOutStart() {
	yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

function* onSignUpStart() {
	yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

function* onSignupSuccess() {
	yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSagas() {
	yield all([
		call(onGoogleSignInStart),
		call(onEmailSignInStart),
		call(checkUserSession),
		call(onSignOutStart),
		call(onSignUpStart),
		call(onSignupSuccess),
	]);
}
