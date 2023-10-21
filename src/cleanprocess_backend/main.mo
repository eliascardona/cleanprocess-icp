import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Hash "mo:base/Hash";
import Iter "mo:base/Iter";

actor cleanprocess {

		stable var elementoId : Nat = 0;

		type miStruct = {
			datoUno: Nat;
			datoDos: Nat;
			datoTres: Nat;
		};

		var miArreglo = HashMap.HashMap<Nat, miStruct>(0, Nat.equal, Hash.hash);


		public func crearPerfil (elemento : miStruct) : async () {

			let id : Nat = elementoId;
			elementoId+=1;


			miArreglo.put(id, elemento);


			return ();

		};


		public query func mostrarPerfiles () : async [(Nat, miStruct)] {

			let miArregloIter : Iter.Iter<(Nat, miStruct)> = miArreglo.entries();
            
			let arregloFormateado : [(Nat, miStruct)] = Iter.toArray(miArregloIter);


			return arregloFormateado;

		};


		public query func encontrarPerfil (id : Nat) : async ?miStruct {

			let elementoRes : ?miStruct = miArreglo.get(id);

			return elementoRes;

		};


		public func actualizarDatos (elemento : miStruct, id : Nat) : async Text {

			let pquery : ?miStruct = miArreglo.get(id);

			switch (pquery) {
				case (null) {
					return "El dato que deseas editar no existe";
				};

				case (?currentelemento) {
					let nuevaInfo : miStruct = {
						datoUno = elemento.datoUno;
						datoDos = elemento.datoDos;
						datoTres = elemento.datoTres;
					};

					miArreglo.put(id, nuevaInfo);

					return "dato actualizado exitosamente";
				};

			};

		};

 
		public func eliminarDato (id : Nat) : async Text {

			let pquery : ?miStruct = miArreglo.get(id);
        
			switch (pquery) {
				case (null) {
					return "El dato que deseas editar no existe";
				};

				case (_) {
					ignore miArreglo.remove(id);

					return "dato eliminado exitosamente";
				};

			};

		};
 
}







