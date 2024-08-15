import axios from "axios";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			users: [],
			auth: false,
			error: {},
			mercadoPago: {},
			products: [],
			product:{},
			favorites:[],
		},
		actions: {
			// loginFetch: async () => {
			// 	try {
			// 	  let response = await axios.get(`${process.env.BACKEND_URL}/api/login`);
			// 	 console.log(response)
			// 	  return response.data;
			// 	} catch (error) {
			// 	  console.error('Error:', error);
			// 	  throw error; 
			// 	}



			login: async (email, password) => {
				// hacer fetch que envie el email y password para poder loguearme
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							"email": email,
							"password": password
						})
					})
					if (response.status === 201) {
						let data = await response.json()
						setStore({ auth: data.logged })
						return true
					}
					if (response.status === 404) {
						let data = await response.json()
						setStore({ error: data.msj })

						return false
					}

					let data = await response.json()
					localStorage.setItem("token", data.access_token)
					setStore({ auth: data.logged })

					return true
				} catch (error) {
					console.log(error);
					return false
				}
			},

			logout: () => {
				// console.log("funciona");
				localStorage.removeItem("token");
				setStore({ auth: false })
				return true

			},

			validToken: async () => {
				let token = localStorage.getItem("token");
				try {
					let response = await fetch(`${process.env.BACKEND_URL}/api/valid_token`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`
						},

					})
					let data = await response.json()
					console.log(data); // me muestra data en consola

				}
				catch (error) {
					console.log(error);
					return false
				}
			},
			register: async (name, email, password, address, phone) => {
				// hacer fetch que envie el email y password para poder loguearme
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/user`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							"name": name,
							"email": email,
							"password": password,
							"address": address,
							"phone": phone,
							"is_active": true,
							"id_role": 1
						})
					})

					if (response.status === 201) {
						let data = await response.json()

						// localStorage.setItem("token", data.access_token)
						setStore({ auth: data.logged })

						return true
					}
					if (response.status === 404) {
						let data = await response.json()
						setStore({ error: data.msj })

						return false
					}
				} catch (error) {
					console.log(error);
					return false
				}
			},

			pagoMercadoPago: async (total) => {
				try {
					const response = await axios.post(back + "/api/preference", {
						total: total,  //acá está de nuevo la variable  donde se guarda el total a pagar por el cliente 
					});
					console.log(response.data);
					setStore({ mercadoPago: response.data });  //guardamos  la info en el objeto que creamos en store 
				} catch (error) {
					console.log(error);
				}
			},
			// Obtener todos los productos
			getProducts: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/products`);
					// if (response.ok) {
						const data = await response.json();
					// 	//return { success: true, data: data.results };
					// } else {
					// 	const errorData = await response.json();
					// 	return { success: false, error: errorData.msj };
					// }
					console.log(data)
					setStore({products: data.results})
					return true
				} catch (error) {
					return { success: false, error: error.message };
				}
			},
			// Obtener un producto específico
			getProduct: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/product/${id}`);
					if (response.ok) {
						const data = await response.json();
						return { success: true, data };
					} else {
						const errorData = await response.json();
						return { success: false, error: errorData.msj };
					}
				} catch (error) {
					return { success: false, error: error.message };
				}
			},
			// Agregar un nuevo producto
			addProduct: async (product) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/product`, {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(product),
					});
					if (response.ok) {
						const data = await response.json();
						return { success: true, data };
					} else {
						const errorData = await response.json();
						return { success: false, error: errorData.msj };
					}
				} catch (error) {
					return { success: false, error: error.message };
				}
			},
			// Eliminar un producto
			deleteProduct: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/product/${id}`, { method: 'DELETE' });
					if (response.ok) {
						return { success: true };
					} else {
						const errorData = await response.json();
						return { success: false, error: errorData.msj };
					}
				} catch (error) {
					return { success: false, error: error.message };
				}
			},
			// Actualizar un producto
			updateProduct: async (id, updates) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/products/${id}`, {
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(updates),
					});
					if (response.ok) {
						const data = await response.json();
						return { success: true, data };
					} else {
						const errorData = await response.json();
						return { success: false, error: errorData.msj };
					}
				} catch (error) {
					return { success: false, error: error.message };
				}
			}

		}

	}
};


export default getState;
