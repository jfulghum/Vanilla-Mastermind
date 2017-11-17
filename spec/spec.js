
// var rewire = require("rewire");
// var script = rewire("../script.js");
//
// var compareToAnswer = script.__get__("compareToAnswer");

  function compareToAnswer(answer, guess){
    var exactCount = 0;
    var nearCount = 0;
    var dupAnswer = answer.slice();
    var dupGuess = guess.slice();
    for (var i = 0; i < answer.length; i++){
      if (dupAnswer[i] === dupGuess[i]){
        exactCount++;
        dupAnswer[i] = NaN;
        dupGuess[i] = NaN;
      }
    }
    for (var i = 0; i < answer.length; i++){
      for (var j = 0; j < answer.length; j++){
        if (dupAnswer[i] === dupGuess[j]){
          nearCount++
          dupAnswer[i] = NaN;
          dupGuess[j] = NaN;
        }
      }
    }
    return [exactCount, nearCount]
  }

  let code1 = ["#0000ff", "#0000ff", "#0000ff", "#0000ff"] //"BBBB"
  let code2 = ["#0000ff", "#ffff00", "#00ff00", "#00ff00"] // "BYGG"
  let code3 = ["#ffa500", "#ffa500", "#ffa500", "#ffa500"] //"OOOO"
  let code4 = ["#00ff00", "#ffff00", "#ffff00", "#ffff00"]// "GYYY"
  let code5 = ["#00ff00", "#ffa500", "#ffff00", "#800080"]// "GOYP"
  let guess1 = ["#ffff00", "#ffff00", "#ffff00", "#0000ff"]// "YYYB"
  let guess2 = ["#0000ff", "#0000ff", "#ffa500", "#ffff00"]// "BBOY"
  let guess3 = ["#008000", "#ffff00", "#ffa500", "#008000"] // "GYOR"
  let guess4 = ["#00ff00", "#00ff00", "#ffff00", "#0000ff"]// "GGYB"
  let guess5 = ["#0000ff", "#0000ff", "#0000ff", "#0000ff"] //"BBBB"
  let guess6 = ["#ffff00", "#0000ff", "#ffa500", "#ffa500"]// "YBOO"
  let guess7 = ["#000000", "#0000ff", "#ffa500", "#ffa500"]// "KBOO" // GOYP : kBOO

  let codeDad = ["#008000", "#008000","#0000ff", "#800080"]// "RRBP"
  let guessDad1 = ["#0000ff", "#008000", "#00ff00", "#ffff00"]// "BRGY"
  let guessDad2 = ["#ffff00", "#0000ff", "#800080", "#ffa500"] // "YBPO"
  let guessDad3 = ["#0000ff", "#008000", "#008000", "#00ff00"] // "BRRG"
  let guessDad4 = ["#000000", "#008000", "#00ff00", "#ffff00"] //  KRGY


describe("compareToAnswer", function() {
  it("should return 0, 0 when none of the correct colors appear", function() {
    expect(compareToAnswer(code1, guess3)).toEqual([0, 0]);
  }) // BBBB : GYOR

  it("should return exactMatches as 0 when the correct colors appear in the wrong positions", function() {
      expect(compareToAnswer(code2, guess4)).toEqual([0, 4]);
  }) // BYGG : GGYB

  it("should return exactMatches as 4 when the correct colors appear in the correct positions", function() {
    expect(compareToAnswer(code1, guess5)).toEqual([4, 0]);
  }) //BBBB : BBBB

  it("should return correct number of nearMatches", function() {
    expect(compareToAnswer(code2, guess6)).toEqual([0, 2]);
  }) //BYGG : YBOO

  it("should return correct number of nearMatches when dups in code", function() {
    expect(compareToAnswer(code4, guess6)).toEqual([0, 1]);
  }) //GYYY : YBOO // Test is right, code is wrong

  it("should return correct number of nearMatches when dups in guess", function() {
    expect(compareToAnswer(code5, guess7)).toEqual([0, 1]);
  }) // GOYP : KBOO //

  it("should return correct number of nearMatches when none are near just exact", function() {
    expect(compareToAnswer(codeDad, guessDad4)).toEqual([1, 0]);
  }) // RRBP : KRGY

  it("should return correct number of nearMatches when two are right color, wrong spot", function() {
    expect(compareToAnswer(codeDad, guessDad2)).toEqual([0, 2]);
  }) // RRBP : CBPO

  it("should return correct number of nearMatches when dups in code and guess", function() {
    expect(compareToAnswer(codeDad, guessDad3)).toEqual([1, 2]);
  }) // RRBP : BRRC

});
//
// });
