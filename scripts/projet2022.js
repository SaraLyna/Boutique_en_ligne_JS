
// SARA LYNA OUYAHIA

// ===  variables globales ===

// constantes
const MAX_QTY = 9;

//  tableau des produits à acheter
const cart = []
// total actuel des produits dans le panier
let total = 0;


// === initialisation au chargement de la page ===

/**
* Création du Magasin, mise à jour du total initial
* Mise en place du gestionnaire d'événements sur filter
*/
const init = function () {
	createShop();
	updateTotal();
	const filter = document.getElementById("filter");
	filter.addEventListener("keyup", filterDisplaidProducts);
}
window.addEventListener("load", init);



// ==================== fonctions utiles =======================

/**
* Crée et ajoute tous les éléments div.produit à l'élément div#boutique
* selon les objets présents dans la variable 'catalog'
*/
const createShop = function () {
	const shop = document.getElementById("boutique");
	for(let i = 0; i < catalog.length; i++) {
		shop.appendChild(createProduct(catalog[i], i));
	}
}

/**
* Crée un élément div.produit qui posséde un id de la forme "i-produit" où l'indice i
* est correpond au paramètre index
* @param {Object} product - le produit pour lequel l'élément est créé
* @param {number} index - l'indice (nombre entier) du produit dans le catalogue (utilisé pour l'id)
* @return {Element} une div.produit
*/
const createProduct = function (product, index) {
	// créer la div correpondant au produit
	const divProd = document.createElement("div");
	divProd.className = "produit";
	// fixe la valeur de l'id pour cette div
	divProd.id = index + "-product";
	// crée l'élément h4 dans cette div
	divProd.appendChild(createBlock("h4", product.name));

	// Ajoute une figure à la div.produit...
	// /!\ non fonctionnel tant que le code de createFigureBlock n'a pas été modifié /!\
	divProd.appendChild(createFigureBlock(product));

	// crée la div.description et l'ajoute à la div.produit
	divProd.appendChild(createBlock("div", product.description, "description"));
	// crée la div.prix et l'ajoute à la div.produit
	divProd.appendChild(createBlock("div", product.price, "prix"));
	// crée la div.controle et l'ajoute à la div.produit
	divProd.appendChild(createOrderControlBlock(index));
	return divProd;
}


/** Crée un nouvel élément avec son contenu et éventuellement une classe
 * @param {string} tag - le type de l'élément créé (example : "p")
 * @param {string} content - le contenu html de l'élément a créé  (example : "bla bla")
 * @param {string} [cssClass] - (optionnel) la valeur de l'attribut 'classe' de l'élément créé
 * @return {Element} élément créé
 */
const createBlock = function (tag, content, cssClass) {
	const element = document.createElement(tag);
	if (cssClass != undefined) {
		element.className =  cssClass;
	}
	element.innerHTML = content;
	return element;
}

/** Met à jour le montant total du panier en utilisant la variable globale total
 */
const updateTotal = function () {
	const montant = document.getElementById("montant");
	montant.textContent = total;
}

// ======================= fonctions à compléter =======================


/**
* Crée un élément div.controle pour un objet produit
* @param {number} index - indice du produit considéré
* @return {Element}
* TODO : AJOUTER les gestionnaires d'événements 
*/
const createOrderControlBlock = function (index) {
	const control = document.createElement("div");
	control.className = "controle";

	// crée l'élément input permettant de saisir la quantité
	const input = document.createElement("input");
	input.id = index + "-qte";
	input.type = "number";
	input.step = "1";
	input.value = "0";
	input.min = "0";
	input.max = MAX_QTY.toString();

	// TODO :  Q5 mettre en place le gestionnaire d'événément pour input permettant de contrôler les valeurs saisies
	control.appendChild(input);
	input.addEventListener("change",verifQuantity); //(fait)
	// Crée le bouton de commande
	const button = document.createElement("button");
	button.className = 'commander';
	button.id = index + "-order";
	control.appendChild(button);
	return control;
}


/**
* Crée un élément figure correspondant à un produit
* @param {Object} product -  le produit pour lequel la figure est créée
* @return {Element}
*/
const createFigureBlock = function (product) {
	// TODO : code incorrect : à modifier Q4 (fait)
	var figure = document.createElement("figure"); //c'est pour recuperer l'element figure (l'image)
	  var images=document.createElement("img");
		images.src=product.image;
    figure.appendChild(images);

  return figure;
}


/**
* @todo Q8
*/
//Documentation de la fonction:
// la fonction permet l'ajout d'un produit au panier, l'ajout se fera grace au bouton qui gere l'evenement click,
// qui sera déclenché que lorsque la quantité sera >0 et <9;
// parametres: const idx et const qty 
// renvoie: /

const orderProduct = function () {
	const idx = parseInt(this.id);
	const qty = parseInt(document.getElementById(idx + "-qte").value);
	if (qty > 0) {
		addProductToCart(idx, qty); // ajoute un produit au panier
		//TODO gérer la remise à zéro de la quantité après la commande
		// et tous les comportements du bouton représentant le chariot
		document.getElementById(idx + "-qte").value=0;
        document.getElementById(idx + "-order").style.opacity=0.25;
	}
}

// ======================= fonctions à coder =======================

/**
* @todo Q6- Q7
*/
const verifQuantity = function () {
	//TODO (fait)
	if (this.value>MAX_QTY || this.value<0){ //si on entre manuellement des valeurs interdites la valeur s'initialisera a 0
		this.value="0";
		this.nextSibling.style.opacity=0.25; //on a aussi gerer l'opacité du chariot quand la valeur est egale a zero
	}
	if (this.value>0){
		this.nextSibling.style.opacity=1; 
	}
	else{
		this.nextSibling.style.opacity=0.25;
	}
	
	if(this.nextSibling.style.opacity==1){
		const butn = document.getElementById(parseInt(this.id)+"-order"); //on a recuperer le boutton qui sert a acheter un produit quand la valeur (quantité) est supereieure a zero et inferieure a 9
		butn.addEventListener('click',orderProduct);
		//window.alert("Attention");
	}
}


/**
* @todo Q9
* @param {number} index
* @param {number} qty
*/
const addProductToCart = function (index, qty) {
	//TODO
	//find est faite pour verifier si le produit est deja dans cart ou pas
		var find=false;
	if( cart.length==0){
				cart.push([index,qty]);
				find=true;
	} else {
		for (var i=0;i<cart.length;i++){
			if (cart[i][0]==index){
					cart[i][1]=qty+cart[i][1];
					qty=cart[i][1];
					 document.getElementById(index + "-achat").remove();
					 const span=document.getElementById("montant"); //mise a jour du montant total des produits presents dans le panier apres la suppression d'un ou plusieurs achats;
		 			span.innerHTML=total;
			  		find=true;
			}						
			  
			}
			if (find==false){		
				cart.push([index,qty]);		
				find=true;
				}
		
	}
	
	//console.log(find);
//si le produit y est deja on s'arrete la , on changera juste sa quantité
//sinon on passe aux fonctions suivantes:
    if (find==true){
	 document.getElementById(index + "-qte").value=0;
	 const divachat=document.createElement("div"); //on a créé un element div.achat
	 divachat.className="achat";
	 divachat.setAttribute("id",index +"-achat");
	 const p=document.querySelector(".achats"); //on veut selectionner tous les elements de l'id achats 
	 const objet=catalog[index]; //on recupere les objets du catalog1
	 const figure=createFigureBlock(objet); //c'est pour recuperer l'image du produit acheté
	 p.appendChild(divachat);
	 divachat.appendChild(figure);
	 const h4=createBlock("h4",objet.name); //c'est pour recuperer le nom du produit acheté
	 divachat.appendChild(h4);
	 divachat.appendChild(createBlock("div",qty,"quantite")); //recuperer la quantité
	 divachat.appendChild(createBlock("div",objet.price,"prix")); //recuperer le prix
	 const control=document.createElement("div"); //on a créé un element div.controle
	 control.className="controle";
	 const boutton=document.createElement("button"); //on a créé le boutton de suppression du produit acheté
	 boutton.className="retirer";
	 boutton.id=index+"-remove";
	 //console.log(boutton);
	 boutton.addEventListener("click",()=>{
		total -= objet.price*qty;
		 document.getElementById(index + "-achat").remove();
		 const span=document.getElementById("montant"); //mise a jour du montant total des produits presents dans le panier apres la suppression d'un ou plusieurs achats;
		 span.innerHTML=total;
		 for (var i=0;i<cart.length;i++){
			if (cart[i][0]==index){
				cart.splice(i, 1);
			}
		 }
	 });
	 control.appendChild(boutton);
	 divachat.appendChild(control);
	 total+=objet.price*qty;
	 const span=document.getElementById("montant"); //mise a jour du montant total des produits presents dans le panier
	 span.innerHTML=total; //on a recuperer le span du document html et le contenu qui etait 0, et on l'actualise avec le nouveau total+
	}
}



/**
* @todo Q10
*/
//documentation:
////la fonction filterSisplaidProducts est faite pour verifier si justement le mot ou la phrase tapée dans
// la barre de recherche du panier est oui ou non presente dans la liste des produits (des jouets)
//parametres:
//une variable filter qui sert a recuperer ce qu'on ecrit dans la barre de recherche
//renvoie:/
const filterDisplaidProducts = function () { 
	var filter = document.getElementById("filter");
	//console.log(filter.value);
	for(var i=0 ; i<catalog.length ; i++){
		var recherche=document.getElementById(i + "-product");
		if(recherche != null)
		recherche.style.display="inline-block";
	}
		//console.log(catalog[i].name);
		for(var i=0 ; i<catalog.length ; i++){
	if(!catalog[i].name.toLowerCase().includes(filter.value)){ //si ce qu'on tape dans la barre de recherche n'est pas inclu dans catalog[i].name alors on ne l'affiche meme pas
			//indexOf(filter.value)){
				var recherche=document.getElementById(i + "-product");
				if(recherche != null)
				recherche.style.display="none";
	}	
		
		
		
			//console.log(catalog[i]);
       
}
}


