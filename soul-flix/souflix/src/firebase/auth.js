
import { sendEmailVerification, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "./config";

export async function cadastrarUsuario(nome, email, senha) {
  // Indicamos o serviço de autenticação e o email e senha do novo usuário
  // 'user' é um objeto com informações do usuário autenticado
  const {user} = await createUserWithEmailAndPassword(auth, email, senha)
  
  auth.languageCode = 'pt';
  
  await sendEmailVerification(user).then( () => {
    console.log("Email verificado")
  })

user.emailVerified
  await updateProfile(user, { displayName: nome });
}

export async function entrarGoogle() {
    // Indicar qual o provedor de login será usado
    const provider = new GoogleAuthProvider();
    // Abre um pop-up na tela com o login do google
    await signInWithPopup(auth, provider);
}

export async function loginUsuario(email, senha) {

  await signInWithEmailAndPassword(auth, email, senha);
}

export async function logout() {
  //Desconectar o usuário
  await signOut(auth);
}