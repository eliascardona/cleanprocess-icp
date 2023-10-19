import { cleanprocess_backend } from "../../declarations/cleanprocess_backend";
//import { AuthClient } from "@dfinity/auth-client"
//import { HttpAgent } from "@dfinity/agent"
//let actor = internetgymmx_backend

const lectorBtn = document.getElementById("abrir-lector")
const editorBtn = document.getElementById("abrir-editor")


const modalLector = document.getElementById("modal-lector")
const modalEditor = document.getElementById("modal-editor")


const cerrarLector = document.getElementById("cerrar-lector")
const cerrarEditor = document.getElementById("cerrar-editor")

lectorBtn.addEventListener("click", () => {
	modalLector.style.display="block"
})

editorBtn.addEventListener("click", () => {
	modalEditor.style.display="block"
})

cerrarLector.addEventListener("click", () => {
	modalLector.style.display="none"
})

cerrarEditor.addEventListener("click", () => {
	modalEditor.style.display="none"
})




const mostrarBtn = document.getElementById("mostrar-btn");
const formUno = document.getElementById("form-uno")
const formDos = document.getElementById("form-dos")
const formTres = document.getElementById("form-tres")
const formCuatro = document.getElementById("form-cuatro")
const perfilesList = document.getElementById("perfiles-list")
const resultadoBusqueda = document.getElementById("resultado-busqueda")


//loginBtn.addEventListener("click", async (e) => {
//	e.preventDefault()
//	console.log("identificando...")
//
//	let authClient = await AuthClient.create()
//
//	await new Promise((resolve, reject) => {
//		authClient.login({
//			identityProvider: process.env.INTERNET_IDENTITY_URL,
//			onSuccess: () => {
//				console.log("Identificación exitosa")
//				resolve()
//			},
//			onError: (error) => {
//				console.error("Error on Internet Identity 'auth/client' process:", error)
//				reject(error)
//			},
//		})
//	})
//
//	const identity = authClient.getIdentity()
//
//	const agent = new HttpAgent({identity})
//
//	actor = createActor(process.env.CLEANPROCESS_BACKEND_CANISTER_ID, {
//		agent,
//	})
//
//	return false
//})


async function mostrarPerfilesFront() {
	try {
		const response = await cleanprocess_backend.mostrarPerfiles()

		console.log("respuesta completa de backend")
		console.log(response)

		response.forEach((el, i) => {
				const id = perfil[0]
				const perfil = el[1]

				console.log("objeto 'perfil' que recibimos desde backend")
				console.log(perfil)

				const nombre = perfil["nombre"]
				const edad = perfil["edad"]
				const peso = perfil["peso"]
				const estatura = perfil["estatura"]
				const programa = perfil["programa"]

				const perfilesDiv = document.createElement("div")

				perfilesDiv.innerHTML=`
					<span>
						${nombre} - ${id}
						<br>
						${edad} años - ${peso}kg - ${estatura}cm
						<br>
						Programa: ${programa}
						<hr>
					<span>
				`
				perfilesList.appendChild(perfilesDiv)
			}
		)
	} catch (error) {
		console.error("Error in function `leerPerfilesFront`:", error)
	}
}


mostrarBtn.addEventListener("click", (e) => {
		e.preventDefault()
		mostrarPerfilesFront()
})


//formUno.addEventListener("submit", async (e) => {
//	e.preventDefault()
//	const buscarData = new FormData(e.target)
//
//	const formId = buscarData.get("search-id-frt")
//	const idFrt = parseInt(formId)
//
//	const response = await cleanprocess_backend.encontrarPerfil(idFrt)
//	console.log("busqueda:")
//	console.log(response)
//
//	response.forEach((el, i) => {
//		let obj = el[0]
//		const nombre = obj.nombre
//		const programa = obj.programa
//
//		resultadoBusqueda.innerHTML=`
//			<span>
//				${nombre} - ${id}
//				<br>
//				Programa: ${programa}
//			<span>
//			<pre>
//				${response}
//			</pre>
//		`
//	})
//
//})


formDos.addEventListener("submit", async (e) => {
	e.preventDefault()
	const crearData = new FormData(e.target)

	const nombreFrt = crearData.get("cr-nombre")
	const edadFrt = crearData.get("cr-edad")
	const pesoFrt = crearData.get("cr-peso")
	const estaturaFrt = crearData.get("cr-estatura")
	const programaFrt = crearData.get("cr-programa")

	const perfilFrt = {
		nombre: nombreFrt,
		edad: parseInt(edadFrt),
		peso: parseInt(pesoFrt),
		programa: programaFrt,
		estatura: parseInt(estaturaFrt)
	}
	console.log("crear perfil, objeto enviado")
	console.log(perfilFrt)

	//  'Request body' esperado:
	//  (record { nombre: Text, peso: Nat }) ...etc 
	await cleanprocess_backend.crearPerfil(perfilFrt)

})


formTres.addEventListener("submit", async (e) => {
	e.preventDefault()
	const actualizarData = new FormData(e.target)

	const formId = eliminarData.get("upd-id-frt")
	const idFrt = parseInt(formId)

	const nombreFrt = actualizarData.get("upd-nombre")
	const edadFrt = actualizarData.get("upd-edad")
	const pesoFrt = actualizarData.get("upd-peso")
	const estaturaFrt = actualizarData.get("upd-estatura")
	const programaFrt = actualizarData.get("upd-programa")

	const perfilFrt = {
		nombre: nombreFrt,
		edad: parseInt(edadFrt),
		peso: parseInt(pesoFrt),
		programa: programaFrt,
		estatura: parseInt(estaturaFrt)
	}
	console.log("actualizar perfil, objeto enviado")
	console.log(perfilFrt)

	//  'Request body' esperado:
	//  (record { nombre: Text, peso: Nat }) ...etc
	await cleanprocess_backend.actualizarPerfil(perfilFrt, idFrt)

})


formCuatro.addEventListener("submit", async (e) => {
	e.preventDefault()
	const eliminarData = new FormData(e.target)

	const formId = eliminarData.get("delete-id-frt")
	const idFrt = parseInt(formId)

	await cleanprocess_backend.eliminarPerfil(idFrt)
	console.log("perfil eliminado exitosamente")

})










