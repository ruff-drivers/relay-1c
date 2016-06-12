'use strict';

var assert = require('assert');
var path = require('path');
var mock = require('ruff-mock');

var verify = mock.verify;
var when = mock.when;

var driverPath = path.join(__dirname, '..');
var runner = require('ruff-driver-runner');

require('t');

describe('Driver for Relay', function () {
    var relay;
    var gpio;

    before(function (done) {
        runner.run(driverPath, function (device, context) {
            relay = device;
            gpio = context.arg('gpio');
            done();
        });
    });

    it('shoule gpio write 0 when realy turn on', function () {
        relay.turnOn();
        verify(gpio).write(0);
    });

    it('shoule gpio write 1 when realy turn off', function () {
        relay.turnOff();
        verify(gpio).write(1);
    });

    it('should isOn when gpio read 0', function () {
        when(gpio).read().thenReturn(0);
        assert(relay.isOn());
    });
});
