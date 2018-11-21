const chai, expect = require('chai');
const mocha = require('mocha');
const MQ_Client = require('../MapQuest_Client_V2');

describe("Geocoding test suite", () => {
    describe("Return the user's location", () => {
        it("Should return a lat/long pair when the navigator function is called", done =>{
            MQ_Client.findMyLocation();
            console.log(userLocation);
        });
    });
    describe("Return a single line geocode location", () => {
        it("Should Return a lat/long for a geocode location", done => {

        });
    });
    describe("Return a single 5 box geocode location", () => {
        it("Should Return a lat/long for a geocode location", done => {

        });
    });
    describe("Return a batch of geocode locations", () => {
        it("Should Return an array of lat/long for the geocode locations", done => {

        });
    });
    describe("Return a path from point A to point B", () =>{
        it("Should return a directional path", done =>{

        });
    });
}); 