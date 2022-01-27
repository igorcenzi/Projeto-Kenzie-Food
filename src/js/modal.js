import {MyProductController} from '../controllers/my-product-controller.js'
import ProdutoModel from '../models/my-products-model.js'

const fechar = document.querySelector('.modal-fechar')
const modal = document.querySelector('.container-modal')
const main_buttons = document.querySelector('.modal-main-buttons')
const buttonAdd = document.getElementById('addProduct')
const select = document.getElementById('modal-form-select')
const selec_list = document.querySelector('.modal-form-select')
const btn_salvar = document.querySelector('.modal-main-salvar')

let funcao = 'novo'

async function fillFields(list){
  const nome = document.getElementById('modal-form-nome')
  const preco = document.getElementById('modal-form-preco')
  const descricao = document.getElementById('modal-form-descricao')
  const categoria = document.querySelector(`input[id="radio-${list.categoria.toLowerCase()}"]`)
  const imagem = document.getElementById('modal-form-imagem')
  
  nome.value = list.nome
  nome.setAttribute('key', list.id)
  preco.value = list.preco
  descricao.value = list.descricao
  categoria.checked = true
  imagem.value = list.imagem
}

select.addEventListener('change',async (ev) => {
  const list = await MyProductController.getById(ev.target.value)
  fillFields(list)
  
})

fechar.addEventListener('click', () => {
  modal.classList.add('display-none')
})


const removeButtonSelected = () => {
  const botoes = document.querySelectorAll('.modal-button')
  botoes.forEach(botao => {
      botao.classList.remove('button-selected') 
})
}

async function fillSelectOptions(){
    selec_list.innerHTML = ''
    const option = document.createElement('option')
    option.innerText = '- Selecione um produto - '
    option.setAttribute('selected', 'selected')
    selec_list.appendChild(option)
    selec_list.classList.remove('display-none')
    selec_list.classList.add('display-block')

    const listaProdutos = await MyProductController.getAll()
    
    listaProdutos.forEach(element=>{
      const option = document.createElement('option')
      option.value = element.id
      option.innerText = element.nome
      selec_list.appendChild(option)
    })
}

main_buttons.addEventListener('click', async (ev) => {
  if(ev.target.classList.contains('modal-button')){
    removeButtonSelected()
  
    ev.target.classList.add('button-selected')
 
  if(ev.target.classList.contains('button-novo')){
    funcao = 'novo' 
    selec_list.classList.remove('display-block')
    selec_list.classList.add('display-none')
  }else if(ev.target.classList.contains('button-alterar')){
    funcao = 'alterar'
    selec_list.classList.remove('display-none')
    selec_list.classList.add('display-block')
    fillSelectOptions()
  }else if(ev.target.classList.contains('button-deletar')){
    funcao = 'delete'
    selec_list.classList.remove('display-none')
    selec_list.classList.add('display-block')
    fillSelectOptions()
  }
  cleanInputs()
}
})



const cleanInputs = () => {
  const nome = document.getElementById('modal-form-nome')
  const preco = document.getElementById('modal-form-preco')
  const descricao = document.getElementById('modal-form-descricao')
  const categoria = document.querySelector('input[name="radio"]:checked')
  const imagem = document.getElementById('modal-form-imagem')
  nome.value = ''
  preco.value = ''
  descricao.value = ''
  if(categoria){
  categoria.checked = false
  }
  imagem.value = ''
}

const getProduct = () => {
  const nome = document.getElementById('modal-form-nome').value
    const preco = document.getElementById('modal-form-preco').value
    const descricao = document.getElementById('modal-form-descricao').value
    const categoria = document.querySelector('input[name="radio"]:checked').value
    const imagem = document.getElementById('modal-form-imagem').value

    const newProduct = new ProdutoModel(nome, preco, categoria, imagem, descricao)
    return newProduct
}
btn_salvar.addEventListener('click', async (ev) => {
  ev.preventDefault()
  if(funcao === 'novo'){
    const newProduct = getProduct()
    if(newProduct.imagem){
    MyProductController.create(newProduct)
    alert('Produto cadastrado')
    }else{
      alert('URL da imagem inválido')
    }
  }else if(funcao === 'alterar'){
    const newProduct = getProduct()
    const id = document.getElementById('modal-form-nome').getAttribute('key')
    MyProductController.patchProduct(id, newProduct)
    alert('Produto alterado')   
    fillSelectOptions()
  }else{
    const id = document.getElementById('modal-form-nome').getAttribute('key')
    MyProductController.deleteProduct(id)
    alert('Produto deletado')
    fillSelectOptions()
  }
  
  cleanInputs()
})

buttonAdd.addEventListener('click',function(){
  modal.classList.remove('display-none')
})