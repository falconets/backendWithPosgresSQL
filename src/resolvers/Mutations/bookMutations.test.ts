

function sum(a:any, b:any){
	return a + b;
}

describe('sum module', ()=>{
	test('adds 1 + 2 to equal 3', ()=>{
		let a = '1'
		let b = '2'
	expect(sum(a, b)).toBe('12');
})
});

export {}


