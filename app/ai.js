class Ai{

    constructor(){
        this.ranks = ['a', '2','3','4','5','6','7','8','9','10','j','q','k'];
        this.knownCards = {};
        for(var counter = 0; counter < ranks.length; counter++){
            this.knownCards[ranks[counter]] = [];
        }
        this.numCurrentlySelected = 0;
    }

    aiTurn(removedCards){
        //console.log(this.knownCards);
        var premature = this.prematureChoose(removedCards);
        if(premature !== false){

            var card1 = $('#card' + premature[0]);
            var card2 = $('#card' + premature[1]);
            this.knownCards[card1rank] = [];
            this.numCurrentlySelected = 0;
                
            card1.trigger("click");
            setTimeout(function(){    
                card2.trigger("click");
            }, 500);

            return null;
        }else{

            function genNumber(){
                return Math.floor((Math.random()*52) + 1);
            }

            var cardNumSelected;
            while(removedCards.includes(cardNumSelected = genNumber()) || (function(that, cardNumSelected){

                for(var counter = 0; counter < that.ranks.length; counter++){
                    var rank = that.ranks[counter];
                    var posArray = that.knownCards[that.ranks[counter]];
                    //console.log(rank);
                    //console.log(posArray);
                    if(posArray.includes(cardNumSelected)){
                        return true;
                    }

                }
                return false;
            })(this, cardNumSelected)){
                continue;
            }
            var card1 = $("#card"+cardNumSelected);
            var card1rank = card1[0].data.rank;
            this.knownCards[card1rank].push(card1[0].data.position);
            this.numCurrentlySelected++;
            setTimeout(function(){
                card1.trigger("click");}
            , 400);
            //console.log(card1);
            //console.log("Made it this far here");
            //console.log(cardNumSelected+"   "+this.numCurrentlySelected);
            if(this.numCurrentlySelected < 2 && this.knownCards[card1rank].length > 1){

                //console.log("first if");
                //console.log(this.knownCards[card1rank][0]);
                var card2 = $('#card' + this.knownCards[card1rank][0]);
                if(card2.data.flipable){
                    this.knownCards[card1rank] = [];
                    this.numCurrentlySelected = 0;
                    setTimeout(function(){
                        card2.trigger("click");
                    }, 500);
                }else{
                    this.knownCards[card1rank] = [this.knownCards[card1rank][1]];
                    this.aiTurn(removedCards);
                }
            }else if(this.numCurrentlySelected < 2){

                //console.log("second if");
                this.aiTurn(removedCards);
            }
            this.numCurrentlySelected = 0;
            return null;


        }
    }

    prematureChoose(removedCards){

        for(var counter = 0; counter < this.ranks.length; counter++){
            var rank = this.ranks[counter];
            var posArray = this.knownCards[this.ranks[counter]];

          //  console.log('Checking arrays if there are any premature matches');
            if(posArray.length > 1){
            //    console.log('There is an array with more than one element');
                if(removedCards.includes(posArray[0]) && removedCards.includes(posArray[1])){
                    this.knownCards[rank] = []
                }else if(removedCards.includes(posArray[0])){
                    this.knownCards[rank] = [posArray[1]];
                }else if(removedCards.includes(posArray[1])){
                    this.knownCards[rank] = [posArray[0]];
                }else{
              //      console.log('And it contains premature matches');
                    return [posArray[0], posArray[1]];
                }

            }
        }
        return false;
    }
}