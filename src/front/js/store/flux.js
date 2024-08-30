import axios from "axios";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			currentUser: null,
			auth: false,
			error: {},
			mercadoPago: {},
			products: [],
			product: {},
			favorites: [],
			cart: [],
			isClearingCart: false,
			totalAmount: 0,
			nutritionists: [],
			personalTrainers: [],
			user: {}
		},
		actions: {
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
					let data = await response.json()

					if (response.status === 200) {
						setStore({
							currentUser: data.user,
							auth: true
						})
						localStorage.setItem("token", data.access_token)
						return true
					}
					if (response.status === 404) {
						setStore({ error: data.msj })

						return false
					}


				} catch (error) {
					console.log(error);
					return false
				}
			},
			logout: () => {
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
							'Authorization': `Bearer ${token}`
						},
					})
					// console.log(response)
					let data = await response.json()
					// console.log(data)
					if (response.status > 400) {
						setStore({
							auth: false
						})
						return
					}
					// if (response.ok) {

					setStore({
						currentUser: data.user,
						auth: true

					})
					// }
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
							"role_id": 1
						})
					})
					console.log(response)
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
				console.log(total)
				try {
					const response = await axios.post(`${process.env.BACKEND_URL}/api/preference`, {
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
					const data = await response.json();
					setStore({ products: data.results })
					return true
				} catch (error) {
					return { success: false, error: error.message };
				}
			},
			// Obtener un producto específico
			getProduct: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/product/${id}`);
					if (response.ok) {
						const data = await response.json();						
						setStore({ product: data });
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
					const response = await fetch(`${process.env.BACKEND_URL}/api/product`, {
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
					const response = await fetch(`${process.env.BACKEND_URL}/api/product/${id}`, { method: 'DELETE' });
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
					const response = await fetch(`${process.env.BACKEND_URL}/api/products/${id}`, {
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
			},

			getFavoritesByUserId: async () => {
				let token = localStorage.getItem("token");
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/wishlist/users`, {
						method: 'GET',
						headers: {
							'Authorization': `Bearer ${token}`
						}
					});
					if (response.ok) {
						const data = await response.json();
						setStore({ favorites: data });
						return { success: true, data };
					} else {
						const errorData = await response.json();
						return { success: false, error: errorData.msj };
					}
				} catch (error) {
					return { success: false, error: error.message };
				}
			},
			addFavorite: async (productId) => {
				const store = getStore();
				const token = localStorage.getItem("token");

				const isFavorited = store.favorites.some(fav => fav.fav_product.id === productId);

				try {
					let response;
					if (isFavorited) {
						const favorite = store.favorites.find(fav => fav.fav_product.id === productId);
						response = await fetch(`${process.env.BACKEND_URL}/api/wishlist/${favorite.id}`, {
							method: 'DELETE',
							headers: {
								'Authorization': `Bearer ${token}`
							}
						});
					} else {
						response = await fetch(`${process.env.BACKEND_URL}/api/wishlist/user`, {
							method: 'POST',
							headers: {
								'Authorization': `Bearer ${token}`,
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({ fav_product: productId })
						});
					}

					if (response.ok) {
						actions.getFavoritesByUserId();
						return { success: true };
					} else {
						const errorData = await response.json();
						return { success: false, error: errorData.msg };
					}
				} catch (error) {
					return { success: false, error: error.message };
				}
			},
			deleteFavorite: async (favoriteId) => {
				let token = localStorage.getItem("token");
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/wishlist/${favoriteId}`, {
						method: 'DELETE',
						headers: {
							'Authorization': `Bearer ${token}`
						}
					});

					if (response.ok) {
						const data = await response.json();
						await getActions().getFavoritesByUserId();
						return { success: true, data };
					} else {
						const errorData = await response.json();
						return { success: false, error: errorData.msg };
					}
				} catch (error) {
					return { success: false, error: error.message };
				}
			},

			getCartByUserId: async () => {
                let token = localStorage.getItem("token");
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/cart`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setStore({ cart: data });
                        getActions().calculateTotal(); // Calcular total después de obtener el carrito
                        return { success: true, data };
                    } else {
                        const errorData = await response.json();
                        return { success: false, error: errorData.msg };
                    }
                } catch (error) {
                    return { success: false, error: error.message };
                }
            },
            addToCart: async (productId, units, totalAmount) => {
                const token = localStorage.getItem("token");
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/cart`, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ product_id: productId, units, total_amount: totalAmount })
                    });

                    if (response.ok) {
                        await getActions().getCartByUserId();
                        return { success: true };
                    } else {
                        const errorData = await response.json();
                        return { success: false, error: errorData.msg };
                    }
                } catch (error) {
                    return { success: false, error: error.message };
                }
            },
            deleteFromCart: async (productId) => {
				let token = localStorage.getItem("token");
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/cart/product/${productId}`, {
						method: 'DELETE',
						headers: {
							'Authorization': `Bearer ${token}`
						}
					});
			
					if (response.ok) {
						await getActions().getCartByUserId();
						getActions().calculateTotal();
						return { success: true };
					} else {
						const errorData = await response.json();
						return { success: false, error: errorData.msg };
					}
				} catch (error) {
					return { success: false, error: error.message };
				}
			},
            calculateTotal: () => {
                const store = getStore();
                const total = store.cart.reduce((acc, item) => acc + (item.total_ammount * item.units), 0);
                setStore({ totalAmount: total });
            },
            clearCart: async () => {
				const { cart } = getStore();
				const { deleteFromCart } = getActions();
				
				if (cart.length === 0) {
					console.log("El carrito ya está vacío");
					return { success: true, message: "El carrito ya está vacío" };
				}
			
				setStore({ isClearingCart: true });
			
				for (let item of cart) {
					const result = await deleteFromCart(item.product.id);
					if (!result.success) {
						setStore({ isClearingCart: false });
						return { success: false, error: result.error };
					}
				}
			
				setStore({ cart: [], isClearingCart: false });
				getActions().calculateTotal();
				console.log("Carrito vaciado");
				return { success: true, message: "Carrito vaciado" };
			},

			// Obtener todos los nutricionistas
			getNutritionists: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/users/nutritionists`);
					const data = await response.json();
					setStore({ nutritionists: data })
					return true
				} catch (error) {
					return { success: false, error: error.message };
				}
			},

			// Obtener todos los peronal-trainers
			getPersonalTrainers: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/users/personal-trainers`);
					const data = await response.json();
					setStore({ personalTrainers: data })
					return true
				} catch (error) {
					return { success: false, error: error.message };
				}
			},

			uploadImage: async (data) => {
				console.log(data)
				const response = await fetch(`${process.env.BACKEND_URL}/api/upload`, {
					method: 'POST',
					body: data,
					headers: {
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					}
				})
				const data_result = await response.json()
				if (response.ok) {
					return data_result
				}
				console.log(data_result)
			},

			scrollToTop: () => {
				window.scrollTo({
					top: 0,
					behavior: "smooth"
				});
			},

			getUserById: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/users/${id}`);
					const data = await response.json();
					
					if (response.ok) {
						setStore({ user: data });
						return { success: true, data };
					} else {
						const errorData = await response.json();
						return { success: false, error: errorData.msj };
					}
				} catch (error) {
					return { success: false, error: error.message };
				}
			},

			updateUser: async (id, userData) => {
				try {
					const response = await axios.put(`${process.env.BACKEND_URL}/api/users/${id}`, userData, {
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${localStorage.getItem('token')}`
						}
					});
					if (response.status === 200) {
						console.log("Perfil actualizado exitosamente:", response.data);
						setStore({ currentUser: response.data });
						return { success: true, data: response.data };
					} else {
						console.log(response)
					}

				} catch (error) {
					console.error("Hubo un problema con la solicitud:", error);
					return { success: false, error: error.message };
				}
			}
		}
	}
};


export default getState;