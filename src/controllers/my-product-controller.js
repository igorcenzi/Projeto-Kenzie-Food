import {RequestAPI} from '../request/requeste.js'

const urlAPI = 'https://kenzie-food-api.herokuapp.com/my/product'
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksImlhdCI6MTY0MzExNzgyNiwiZXhwIjoxNjQzOTgxODI2LCJzdWIiOiJbb2JqZWN0IFVuZGVmaW5lZF0ifQ.qqcyKNMDkRvOA-K7-L6vSo7HEW-if-jqwV3WH_yOypA'

const config = {
  headers: {
    "Content-Type": "application/json",
   "Authorization": token
  }
}

class MyProductController{
    static async getAll(){
      config.method = "get"
      config.body = null
      const data = await RequestAPI.getMyProduct(urlAPI, config)
      return data
    }

    static async getById(id){
      config.method = "get"
      const data = await RequestAPI.getMyProduct(`${urlAPI}/${id}`, config)
      return data
    }

    static async deleteProduct(id){
      config.method = "delete"
      config.body = null
      const data = await RequestAPI.getMyProduct(`${urlAPI}/${id}`, config)
      return data
    }

    static async create(product){
      config.method = "post"
      config.body = JSON.stringify(product)
      const data = await RequestAPI.getMyProduct(urlAPI, config)
      return data
    }

    static async patchProduct(id,product){
      config.method = "PATCH"
      config.body = JSON.stringify(product)
      const data = await RequestAPI.getMyProduct(`${urlAPI}/${id}`, config)
      console.log(config)
      return data
    }
}

export {MyProductController}