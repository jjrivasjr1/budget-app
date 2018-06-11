
//The budget controller
var budgetController = ( function (){
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    // var allExpenses = [];
    // var allIncome = [];
    // var totalExpenses = 0;

    var data = {
        allItems: {    
            exp: [],
            inc: []
        },

            totals: {
                exp: 0,
                inc: 0
            }

    };

        return {
            addItem: function(type, des, val) {
                var newItem;
                //create new id based on 'inc' or 'exc' type
                if (data.allItems[type].length > 0){
                    ID = data.allItems[type][data.allItems[type].length -1].id + 1;
                } else {
                    ID = 0;
                }

                if(type === 'exp'){
                    newItem = new Expense(ID, des, val);
                } else if (type === "inc") {
                     newItem = new Income(ID, des, val);
                } 
                //Push it into our data structure
                data.allItems[type].push(newItem);

                //Return the new element
                return newItem;
            },
            testing: function(){
                console.log(data);
            }
        };




})();


//UI controller
var UIController = (function() {
    DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    };

    return {
        getInput: function () {
            return {
                 type: document.querySelector(DOMstrings.inputType).value,// will either be inc or exp
                 description: document.querySelector(DOMstrings.inputDescription).value,
                 value: document.querySelector(DOMstrings.inputValue).value
            };
        },
        getDOMstrings: function (){
            return DOMstrings;
        }
    };

})();


//Global app controller
var controller = (function(budgetCtrl, UICtrl) {

    var setupEventListeners = function() {
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event) {
          if(event.keyCode === 13 || event.which === 13) {
              ctrlAddItem();
          }
    
         });
    }

    var DOM = UICtrl.getDOMstrings();

    var ctrlAddItem = function () {
        var input, newItem;
            //Get the filed input data
             input = UICtrl.getInput();
            // console.log(input);

            //add the item to the budget controller
             newItem =  budgetCtrl.addItem(input.type, input.description, input.value);

            //add the item to the UI

            //Calculate the budget

            //Display the budget on the UI

    }

    return {
        init:function(){
            console.log('Application has started');
            setupEventListeners();
        }
    }

})(budgetController, UIController);

controller.init();