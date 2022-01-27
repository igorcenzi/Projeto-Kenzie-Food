class VitriniModel{
    static renderProduct(arrProdutcs){

        const ulMain = document.querySelector('.listaProdutos')
        ulMain.innerHTML = ''
        arrProdutcs.forEach(element=>{
            const li = document.createElement('li')
            const img = document.createElement('img')
            const h3 = document.createElement('h3')
            const span = document.createElement('span')
            const pDesc = document.createElement('p')
            const divCompra = document.createElement('div')
            const pPrice = document.createElement('p')
            const button = document.createElement('button')
            
            img.src = element.imagem
            img.alt = element.nome
            span.innerText = element.categoria
            h3.innerText = element.nome
            pDesc.innerText = element.descricao
            pPrice.innerText = `R$ ${element.preco}`
            button.classList.add('comprar')
            
            divCompra.classList.add('comprar')

            li.appendChild(img)
            li.appendChild(span)
            li.appendChild(h3)
            li.appendChild(pDesc)
            divCompra.appendChild(pPrice)
            divCompra.appendChild(button)
            li.appendChild(divCompra)

            ulMain.appendChild(li)
        })

    }
    static arrProdutos = []
    
    static renderProductCart(arrProduto){
        const vitriniCarrinho = document.querySelector('.listaCarrinho')
        vitriniCarrinho.innerText = ''
        arrProduto.forEach(element=>{
            
            const liContainer = document.createElement('li')
            const imgProductCart = document.createElement('img')
            const divInfo = document.createElement('div')
            const nameProductCart = document.createElement('h3')
            const spantTag = document.createElement('span')
            const pPrice = document.createElement('p')
            const buttonRemove = document.createElement('button')

            divInfo.classList.add('infoProdutos')
            buttonRemove.classList.add('remover')

            imgProductCart.src = element.imagem
            nameProductCart.innerText = element.nome 
            spantTag.innerText = element.categoria
            pPrice.innerText = `R$ ${element.preco}`
            
            liContainer.appendChild(imgProductCart)
            divInfo.appendChild(nameProductCart)
            divInfo.appendChild(spantTag)
            divInfo.appendChild(pPrice)
            liContainer.appendChild(divInfo)
            liContainer.appendChild(buttonRemove)
            
            vitriniCarrinho.appendChild(liContainer)
        })
        
    }

}

export {VitriniModel}