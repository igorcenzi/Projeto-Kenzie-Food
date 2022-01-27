import {RequestAPI} from '../request/requeste.js'
import { MyProductController } from '../controllers/my-product-controller.js'

const urlAPI = 'https://kenzie-food-api.herokuapp.com/product'
let dataFinal = []

class ProductController{

    static async getAll(){
      const data = await RequestAPI.getProduct(urlAPI)
      const dataNew = await MyProductController.getAll()
      dataFinal = [...data,...dataNew]
      return dataFinal
    }

    static async getById(id){
      const data = await RequestAPI.getProduct(urlAPI + `/${id}`)
      return data
    }

    static async filterProductByCategory(category){
      const filtered = dataFinal.filter(product => product.categoria === category)
      return filtered
    }

    static async filterProductByName(name){
      const filtered = dataFinal.filter(product => product.nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()))
      return filtered
    }
}

export {ProductController}