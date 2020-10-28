function createHero(){
    
    let hero = {
         mage: function(name){
            let mageHero = {
                name: name,
                health: 100,
                mana: 100,
                cast: function(spell){
                    console.log(`${name} cast ${spell}`);
                    this.mana --;
                }
            }
            return mageHero;
        },

        fighter: function(name){
            let fighterHero = {
                name: name,
                health: 100,
                stamina: 100,
                fight: function(spell){
                    console.log(`${name} slaches at the foe!`);
                    this.stamina --;
                }
            }

            return fighterHero;
        }
    }
    return hero;
}

let create = createHero();
let mage = create.mage('Pesho');
mage.cast('aaa');

let fighter = create.fighter('Gosho');
fighter.fight();