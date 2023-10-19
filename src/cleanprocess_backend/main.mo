import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Hash "mo:base/Hash";
import Iter "mo:base/Iter";

actor cleanprocess {

		stable var postId : Nat = 0;

		type PerfilDeportivo = {
			nombre: Text;
			edad: Nat;
			peso: Nat;
			estatura: Nat;
			programa: Text;
		};

		var perfiles = HashMap.HashMap<Nat16, PerfilDeportivo>(0, Nat.equal, Hash.hash);


		public func crearPerfil (post : PerfilDeportivo) : async () {

			let id : Nat = postId;		// Creación de un `id` para cada post
			postId+=1;					// Asignación del `id`


			perfiles.put(id, post);		// Añadimos el post actual (perfil deportivo) al array


			return ();

		};


		public query func mostrarPerfiles () : async [(Nat, PerfilDeportivo)] {

			let perfilesIter : Iter.Iter<(Nat, PerfilDeportivo)> = perfiles.entries();
            
			let perfilesArray : [(Nat, PerfilDeportivo)] = Iter.toArray(perfilesIter);


			return perfilesArray;

		};


		public query func encontrarPerfil (id : Nat) : async ?PerfilDeportivo {

			let postRes : ?PerfilDeportivo = perfiles.get(id);	// Query basada en el id


			return postRes;

		};


		public func actualizarPerfil (post : PerfilDeportivo, id : Nat) : async Text {

			let pquery : ?PerfilDeportivo = perfiles.get(id);	// Query basada en el id


			switch (pquery) {
				case (null) {
					return "El perfil que deseas editar no existe";
				};

				case (?currentPost) {
					let nuevoPerfil : PerfilDeportivo = {
						nombre = post.nombre;
						edad = post.edad;
						peso = post.peso;
						estatura = post.estatura;
						programa = post.programa;
					};

					perfiles.put(id, nuevoPerfil);

					return "Perfil actualizado exitosamente";
				};

			};

		};

 
		public func eliminarPerfil (id : Nat) : async Text {

			let pquery : ?PerfilDeportivo = perfiles.get(id);	// Query basada en el id
        
			switch (pquery) {
				case (null) {
					return "El perfil que deseas editar no existe";
				};

				case (_) {
					ignore perfiles.remove(id);

					return "Perfil eliminado exitosamente";
				};

			};

		};
 
}







