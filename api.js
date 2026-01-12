import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDocs, getDoc, query, where } from "firebase/firestore/lite"

const firebaseConfig = {
    apiKey: "REMOVED",
    authDomain: "vanlife-f7268.firebaseapp.com",
    projectId: "vanlife-f7268",
    storageBucket: "vanlife-f7268.firebasestorage.app",
    messagingSenderId: "517434246202",
    appId: "1:517434246202:web:01b68a1e4aa427ea51a103"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const vansCollectionRef = collection(db, 'vans')

export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))

    return vans;
}

export async function getVan(id) {
    const docRef = doc(db, 'vans', id)
    const snapshot = await getDoc(docRef)
    const van = { ...snapshot.data(), id: snapshot.id };

    return van
}

export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "1"))
    const snapshot = await getDocs(q)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))

    return vans
}

export async function getHostVan(id) {
    const docRef = doc(db, "vans", id)
    const snapshot = await getDoc(docRef)

    const hostVan = { ...snapshot.data(), id: snapshot.id }

    if (hostVan.hostId !== "1") {
        throw new Error("Unauthorized access")
    }

    return hostVan;
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}
