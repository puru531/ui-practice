import { pluck, range } from "./utils";

describe('utils', ()=> {

    describe('range', ()=> {
        it('should return corrext range from 5 to 9', ()=> {
            const result = range(5, 10);
            expect(result).toEqual([5, 6, 7, 8, 9])
        });
        it('should return corrext range from 45 to 59', ()=> {
            const result = range(45, 60);
            expect(result).toEqual([45,46,47,48,49,50,51,52,53,54,55,56,57,58,59])
        });
    });

    describe('pluck', ()=> {
        it('should pluck name from the list of objects', ()=> {
            const characters = [
                {name: 'John'},
                {name: 'Jane'},
                {name: 'Jack'}
            ]
            const result = pluck(characters, 'name');
            expect(result).toEqual(['John', 'Jane', 'Jack'])
        })
    })

})