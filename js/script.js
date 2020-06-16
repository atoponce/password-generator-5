var pg = angular.module('pg',[]);

pg.controller('MainCtrl', [ '$scope', function( $scope ){

    $scope.generatedPassword = '';
    $scope.charCount = 14;
    
    $scope.samples = [
        {
            chars: 'abcdefghijklmnopqrstuvwxyz'.split(''),
            isSet: true
        },
        {
            chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
            isSet: true
        },
        {
            chars: '+-*@#%=?!_;./'.split(''),
            isSet: true
        },
        {
            chars: '123456789'.split(''),
            isSet: true
        }
    ];
    
    var activeSamples = [0,1,2,3],
        pass = [], sample = '',
        choice, r, letter;

    var getRandomNumber = function( length ){
        const crypto = window.crypto || window.msCrypto;

        let min = (-length >>> 0) % length;
        let randNum = new Uint32Array(1);

        do {
            var x = crypto.getRandomValues(randNum);
        } while (x < min)

        return x % length; 
    };
    
    $scope.makePassword = function(){
        
        pass = [];
        
        activeSamples = [];
        
        // Count the active char sets that will be used in the pass
        $scope.samples.forEach(function( item, i ){
            
            if ( item.isSet ) activeSamples.push( item.chars );
        
        });
        
        if ( activeSamples.length ) {
        
            // Build the password
            for ( var i=0; i < $scope.charCount; i++ ){

                // Get a random number to choose from the active char sets
                choice = getRandomNumber( activeSamples.length );

                // Get the char set ab, AB or !@#$
                sample = activeSamples[choice];
                sample = sample;

                // Get the random char from the set
                r = getRandomNumber( sample.length );
                letter = sample[r];

                pass.push( letter );
            }

            $scope.generatedPassword = pass.join('');
        
        } else {
        
            $scope.generatedPassword = 'Please choose a char set.';
            
        }
            
        
    };
    
    $scope.makePassword();

}]);
