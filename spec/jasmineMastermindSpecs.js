
(function() {
  'use strict';

describe('compareCodeToGuess', function() {
  let(:code1) { ("BBBB") }
  let(:code2) { ("BYGG") }
  let(:code3) { ("OOOO") }
  let(:code4) { ("GYYY")}
  let(:code5) { ("GOYP")}
  let(:guess1) { ("YYYB") }
  let(:guess2) { ("BBOY") }
  let(:guess3) { ("GYOR") }
  let(:guess4) { ("GGYB") }
  let(:guess5) { ("BBBB") }
  let(:guess6) { ("YBOO") }
  let(:guess7) { ("WBOO") }

  let(:codeDad) { "RRBP") }
  let(:guessDad1) { ("BRGY")}
  let(:guessDad2) { ("CBPO")}
  let(:guessDad3) { ("BRRC")}


describe("compareCodeToGuess", function() {
  it("should return 0, 0 when none of the correct colors appear") {
    expect(compareCodeToGuess(code1, guess3)).to eq(0, 0);
  } // BBBB : GYOR

  it("should return exactMatches as 0 when the correct colors appear in the wrong positions") {
    expect(compareCodeToGuess(code2, guess4).to eq(0, 4);
  } // BYGG : GGYB

  it("should return exactMatches as 4 when the correct colors appear in the correct positions" {
    expect(compareCodeToGuess(code1, guess5).to eq(4, 0)
  } //BBBB : BBBB

  it("should return correct number of nearMatches") {
    expect(compareCodeToGuess(code2, guess6)).to eq(0, 2)
  } //BYGG : YBOO

  it("should return correct number of nearMatches when dups in code") {
    expect(compareCodeToGuess(code4, guess6)).to eq(0, 1)
  } //GYYY : YBOO

  it("should return correct number of nearMatches when dups in guess") {
    expect(compareCodeToGuess(code5, guess7)).to eq(0, 1)
  } // GOYP : WBOO

  it("should return correct number of nearMatches") {
    expect(compareCodeToGuess(codeDad, guessDad1)).to eq(1, 0)
  } // RRBP : BRGY

  it("should return correct number of nearMatches") {
    expect(compareCodeToGuess(codeDad, guessDad2)).to eq(0, 2)
  } // RRBP : CBPO

  it("should return correct number of nearMatches when dups in code and guess") {
    expect(compareCodeToGuess(codeDad, guessDad3)).to eq(1, 2)
  }  // RRBP : BRRC

}
