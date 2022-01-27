
class ProdutoModel{
  constructor(nome, preco, categoria, imagem, descricao){
      if(this.validaUrlImagem(imagem) && Number(preco) >= 0){
        this.nome       = `${nome}`
        this.preco      =  Number(preco)
        this.categoria  = `${categoria}`
        this.imagem     = `${imagem}`
        this.descricao  = `${descricao}`
      }
  }

  validaUrlImagem(url){
    try{
      const urlImagem = new URL(url)
      return true
    }catch(err){
      return false
    }
  }
}

export default ProdutoModel