class RequestAPI{
   static getProduct(urlAPI){
    const response = fetch(urlAPI).then(resp => resp.json())
    return response
  }

  static getMyProduct(urlAPI, config){
    const response = fetch(urlAPI,config).then(resp => resp.json())
    return response
  }
}

export{RequestAPI}