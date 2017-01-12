'use strict';

var Level = require('gpio').Level;
var assert = require('assert');

var mock = require('ruff-mock');

var when = mock.when;
var any = mock.any;

var Device = require('../');

require('t');

describe('Relay Driver', function () {
    var relay;
    var gpio;

    before(function () {
        gpio = mock();
        relay = new Device({
            gpio: gpio
        });
    });

    it('shoule gpio write `Level.low` when turn on', function (done) {
        when(gpio)
            .write(any, any)
            .then(function (level, callback) {
                assert.equal(level, Level.low);
                callback();
            });

        relay.turnOn(done);
    });

    it('shoule gpio write `Level.high` when turn off', function (done) {
        when(gpio)
            .write(any, any)
            .then(function (level, callback) {
                assert.equal(level, Level.high);
                callback();
            });

        relay.turnOff(done);
    });

    it('should have `isOn` called back with true when gpio read `Level.high`', function (done) {
        when(gpio)
            .read(any)
            .then(function (callback) {
                callback(undefined, Level.low);
            });

        relay.isOn(function (error, on) {
            assert.ifError(error);
            assert.strictEqual(on, true);
            done();
        });
    });
});
