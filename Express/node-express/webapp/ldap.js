// Documentation http://ldapjs.org/client.html
const ldap   = require('ldapjs');
const assert = require('assert');


// -------------- CONFIG ------------------------------
const ldap_server = 'ldaps://ldap.rit.edu',
      ldap_dn     = 'ou=people,dc=rit,dc=edu',
      ldap_user   = '', // to be filled in
      ldap_pass   = '', // to be filled in
      attributes  = ['uid', 'givenname', 'sn'],
      bind_dn     = `uid=${ ldap_user },${ ldap_dn }`;
// ----------------------------------------------------


// Checks that the provided studentID underlying value is an integer.
function studentIDIsValid(studentID) {
    return Number.isInteger(Number(studentID));
}


// Attempts to establish a connection to the specified LDAP server.
function createConnection() {
    let client = ldap.createClient( { url: ldap_server } );

    // Establish error handling
    client.on('error', (generalError) => {
        try {
            assert.ifError(generalError);
        }    
        catch (err) {
            console.log('Error with LDAP client: ', err);
        }
    });

    // Authenticate with server
    client.bind(bind_dn, ldap_pass, (bindError) => {
        try {
            assert.ifError(bindError);
        } 
        catch (err) {
            console.log('Error authenticating (aka binding) with LDAP server: ', err);
        }
    });

    return client;
}


/*
*ASYNC FUNCTION*
Configures a search request then sends it to the LDAP server.
- client: The ldapjs client returned from ldap.createClient
- studentID: The verified studentID
- callback: A function that takes one parameter for the response object.
*/
function search(client, studentID, callback) {
    const search_options = {
        filter: `(ritID=${ studentID })`,
        attributes: attributes,
        sizeLimit: 1
    };

    client.search(bind_dn, search_options, (requestError, res) => {
        assert.ifError(requestError)
       
        // Listen for returned data and fire callback
        res.on('searchEntry', (entry) => callback(entry.object));
    
        // Listen for errors from the result
        res.on('error', (resultError) => {
            try {
                assert.ifError(resultError);
            } catch (err) {
                console.log('Error with LDAP query: ', err);
            }
        });
    });
}


/*
Sends an unbind request to the LDAP server as a courtesy. 
A new client must be created after calling this function.
*/
function unbind(client) {
    client.unbind( (unbindError) => {
        // disregard this error
    });
}


/* 
*ASYNC FUNCTION*

Attempts to retrieve student data from LDAP server
- Student ID: Must be a valid student ID (string or number)
- Callback: A function that is called upon successful response from LDAP server. Must have
one parameter for the response object.
*/
 function getStudentData(studentID, callback) {

    if (!studentIDIsValid(studentID)) { 
        callback(null); 
        return;
    }

    let client = createConnection();
    search(client, studentID, callback);

    if (client.connected) { unbind(client); }
}

module.exports = { getStudentData };