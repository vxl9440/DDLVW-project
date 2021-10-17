// Documentation http://ldapjs.org/client.html
const ldap   = require('ldapjs');
const assert = require('assert');

// -------------- CONFIG ------------------------------
const ldap_server = 'ldaps://ldap.rit.edu',
      ldap_user   = 'iSchoolCheckIn',
      ldap_pass   = 'Iste501SeniorDev',
      attributes  = ['uid', 'cn'],
      search_dn   = 'ou=people,dc=rit,dc=edu',
      bind_dn     = `uid=${ ldap_user },${ search_dn }`;
// ----------------------------------------------------


// Checks that the provided studentID underlying value is an integer.
function studentIDIsValid(studentID) {
    return Number.isInteger(Number(studentID));
}


// Attempts to establish a connection to the specified LDAP server.
async function createConnection() {
    const client = ldap.createClient( { url: ldap_server } );
    
    // Establish error handling
    client.on('error', (generalError) => {
        try {
            assert.ifError(generalError);
        }    
        catch (err) {
            console.log('Error with LDAP client: ', err);
            return null;
        }
    });

    return new Promise((resolve, _) => {
        // Authenticate with server
        client.bind(bind_dn, ldap_pass, (bindError) => {
            try {
                assert.ifError(bindError);
                resolve(client);
            } 
            catch (err) {
                console.log('Error authenticating (aka binding) with LDAP server: ', err);
                resolve(null);
            }
        });
    });
}


/*
*ASYNC FUNCTION*
Configures a search request then sends it to the LDAP server.
- client: The ldapjs client returned from ldap.createClient
- studentID: The verified studentID
- callback: A function that takes one parameter for the response object.
*/
async function search(client, studentID) {
    const search_options = {
        filter: `(ritID=${ studentID })`,
        scope: 'sub',
        attributes: attributes,
        sizeLimit: 1 
    };

    return new Promise((resolve, reject) => {
        client.search(search_dn, search_options, (requestError, res) => {
            try {
                assert.ifError(requestError);
            } catch(err) {
                console.log('Error with LDAP query', err);
                reject();
            }
            
            // Listen for returned data and resolve promise
            res.on('searchEntry', (entry) => {
                resolve({
                    'studentName': entry.object['cn'],
                    'studentUsername': entry.object['uid']
                }); 
            });
        
            // Listen for errors from the result
            res.on('error', (resultError) => {
                try {
                    assert.ifError(resultError);
                } catch (err) {
                    console.log('Error with LDAP result: ', err);
                    reject();
                }
            });
        });
    });
}


/*
Sends an unbind request to the LDAP server as a courtesy. 
A new client must be created after calling this function.
Doesn't really matter if there is an error since we are already done with the connection.
*/
function unbind(client) {
    client.unbind( (unbindError) => {
        // disregard this error
    });
}


/* 
*ASYNC FUNCTION*
(Requires connection to RIT Network)
Attempts to retrieve student data from LDAP server
- Student ID: Must be a valid student ID (string or number)
- Usage (from within an async func or top-level scope in a module):
    const studentInfo = await getStudentData('xxxxxxxxx');
*/
async function getStudentData(studentID) {

    if (!studentIDIsValid(studentID)) { return null; }

    // returns a connected client or null if connection failed
    const client = await createConnection(); 
    
    if (client) {
        try {
            return await search(client, studentID); 
        } catch {
            return null;
        } finally {
            if (client.connected) { 
                unbind(client); 
            }
        }
    } else {
        return null;
    }
}

module.exports = { getStudentData };