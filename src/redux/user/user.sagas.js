import { takeLatest, put, all, call} from 'redux-saga/effects';


import userActionTypes from './user.types';
import { signInSuccess, signInFailure, signOutSuccess, signOutFailure, signUpSuccess, signUpFailure } from './user.actions';
import { auth, createUserProfileDocument, getCurrentUser, saveUserData } from '../../firebase/firebase.config';

function* signInOperation(userAuth, additionalData){
    try{
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({id : userSnapshot.id, ...userSnapshot.data()}));
    }catch(error){
        yield put(signInFailure(error));
        console.log(error.message)
    }
};

function* checkUserExists(email, password){
    try{
        const {user} = yield auth.signInWithEmailAndPassword(email, password);
        if(user){
            yield signInOperation(user);
            return true;
        }
    }catch(error){
        console.log(error.message);
        return false;
    }
}

export function* emailAndPasswordSignIn({ payload : {email, password} }){
    try{
        const userExists = yield checkUserExists(email, password);
        if(!userExists){
            const { user } = yield auth.createUserWithEmailAndPassword(email, password);
            yield signInOperation(user);
        }
    }catch(error){
        yield put(signInFailure(error));
    }
};

function* signUpStart({payload}){
    try {
        yield put(signUpSuccess(payload));
    }catch(error){
        yield put(signUpFailure());
    }
}

function* addUserData({payload}){
    const userAuth = yield getCurrentUser();
    console.log("in add user", payload);
    console.log("user auth", userAuth);
    try {
        yield put(saveUserData(userAuth, payload));
    }catch(error){
        yield put(signUpFailure());
    }
}

function* signOut(){
    try{
        yield auth.signOut();
        yield put(signOutSuccess());

    }catch(error){
        yield put(signOutFailure());
    }
}

function* isUserAuthenticated(){
    try{
        const userAuth = yield getCurrentUser();
        if(!userAuth) return;
        yield signInOperation(userAuth);
    }catch(error){
        signInFailure(error);
    }
        
}


export function* emailSignInStart(){
    yield takeLatest( userActionTypes.EMAIL_SIGNIN_START, emailAndPasswordSignIn);
}

function* onSignUpStart(){
    yield takeLatest( userActionTypes.SIGN_UP_START, signUpStart )
}

function* onSignUpSuccess(){
    yield takeLatest(userActionTypes.SIGN_UP_SUCCESS,addUserData )
}

export function* userSignOutStart(){
    yield takeLatest( userActionTypes.SIGN_OUT_START, signOut )
}


export function* checkUserSession(){
    yield takeLatest(userActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}


export function* userSagas(){
    yield all([
        call(emailSignInStart),
        call(checkUserSession),
        call(userSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ])
}