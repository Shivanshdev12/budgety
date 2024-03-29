var budgetController = (function () {
var Expense=function(id,description,value)
{
    this.id=id;
    this.description=description;
    this.value=value;
}

var Income=function(id,description,value)
{

    this.id=id;
    this.description=description;
    this.value=value;
}

var data={
    allItems:{
        exp:[],
        inc:[]
    },
    totals:{
        exp:0,
        inc:0
    },
    budget:0,
    percenatge:-1
}
return {
    addItems:function(type,des,val)
    {
        var newItem,ID;
        if(data.allItems[type].length>0)
        {
        ID=data.allItems[type][data.allItems[type].length-1].id+1;}
         else{
             ID=0;
         }   

        if(type==='exp')
        newItem=new Expense(ID,des,val);
        else if(type==='inc')
        newItem=new Income(ID,des,val);

        data.allItems[type].push(newItem);

         return newItem;
    }
}

})();


var UIController = (function () {
    var DOMStrings = {
        inputType:'.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        expenseContainer:'.expenses__list',
        incomeContainer:'.income__list'
    };
    return {
        getDOMStrings: function () {
            return DOMStrings;
        },
        getInput:function()
        {
            return{
                type:document.querySelector(DOMStrings.inputType).value,
                description:document.querySelector(DOMStrings.inputDescription).value,
                inputValue:document.querySelector(DOMStrings.inputValue).value
            };

        },
        addListItem: function(obj, type) {
            var html, newHtml, element;
            // Create HTML string with placeholder text
            
            if (type === 'inc') {
                element = DOMStrings.incomeContainer;
                
                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMStrings.expenseContainer;
                
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            
            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%',obj.value);
            
            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        }
        
    }







})();

var Controller = (function (budgetCtrl, UICtrl) {
    var DOM = UICtrl.getDOMStrings();

    document.querySelector(DOM.inputBtn).addEventListener('click', function()
    {
        ctrlAddItem();
    });

    document.addEventListener('keypress', function (event) {
        if (event.keyCode === 13 || event.which === 13) {
            console.log('Enter pressed!');
            ctrlAddItem();
        }
    });

    var ctrlAddItem = function () {
        var input,newItem;
        input = UICtrl.getInput();
        newItem=budgetCtrl.addItems(input.type,input.description,input.inputValue);
        UICtrl.addListItem(newItem,input.type);
        console.log(newItem);
    }


})(budgetController, UIController);
