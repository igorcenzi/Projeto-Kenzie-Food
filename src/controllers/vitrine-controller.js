import {ProductController} from '../controllers/product-controller.js'
import {VitriniModel} from '../models/product-model.js'
import { MyProductController } from '../controllers/my-product-controller.js'

const lista = await ProductController.getAll()

VitriniModel.renderProduct(lista)

const containerPrincipal = document.querySelector('.float')
const searchInput = document.getElementById('searchInput')
const divSum = document.querySelector('.hidden')
const listaCart = document.querySelector('.listaCarrinho')
const vazioTexto = document.querySelector('.vazioTexto')

class CarrinhoCompras{
    static arr = []

    static addCart(event){
        if(event.target.tagName === 'BUTTON' && event.target.className === 'comprar'){
            
            const liParent = event.target.parentNode.parentNode
            const name = liParent.querySelector('h3').innerText
            const produtoFiltrado = lista.find(element=> element.nome === name)
            
            CarrinhoCompras.arr.push(produtoFiltrado)

            localStorage.setItem('carrinho',CarrinhoCompras.arr)

            VitriniModel.renderProductCart(CarrinhoCompras.arr)
            CarrinhoCompras.sumProducts(CarrinhoCompras.arr)
            
            if(CarrinhoCompras.arr.length>0){
                listaCart.classList.remove('carrinhoVazio')
                divSum.classList.remove('hidden')
            }
            
        }else if(event.target.tagName === 'BUTTON' && event.target.className === 'remover'){

            const liParent = event.target.parentNode
            const name = liParent.querySelector('h3').innerText
            
            CarrinhoCompras.arr = CarrinhoCompras.arr.filter(element=>element.nome !== name)

            VitriniModel.renderProductCart(CarrinhoCompras.arr)

            CarrinhoCompras.sumProducts(CarrinhoCompras.arr)

            if(CarrinhoCompras.arr.length==0){
                listaCart.classList.add('carrinhoVazio')
                divSum.classList.add('hidden')
                listaCart.appendChild(vazioTexto)
            }
        }
    }

    static async findSearch(search){
        let product = await ProductController.filterProductByName(search)
        let categoria = await ProductController.filterProductByCategory(search)
        if(product.length === 0){
            VitriniModel.renderProduct(categoria)
        }else{
            VitriniModel.renderProduct(product)
        }
        
    }

    static async categorySearch(category){
        let productList = await ProductController.filterProductByCategory(category)
        VitriniModel.renderProduct(productList)
    }

    static sumProducts(arrProducts){
        let total = 0
        arrProducts.forEach(element=>{
            total += element.preco
        })
        let qntItems = arrProducts.length

        const pQnt = document.getElementById('quantidade')
        const pSum = document.getElementById('sumTotal')

        pQnt.innerText = qntItems
        pSum.innerText = `R$ ${total}`
        
    }

}

const filterList = document.querySelectorAll('.filter')

filterList.forEach(element=>{
    element.addEventListener('click',function(){
        if(element.id === 'todos'){
            VitriniModel.renderProduct(lista)
        }else{
            CarrinhoCompras.categorySearch(element.id)
        }
        
    })
})

searchInput.addEventListener('input',function(){
    CarrinhoCompras.findSearch(searchInput.value)
})
containerPrincipal.addEventListener('click',CarrinhoCompras.addCart)