const chai = require('chai')
const expect = chai.expect
const dirtyChai = require('dirty-chai')
const sinon = require('sinon')
const inquirer = require('inquirer')
const CredentialManager = require('../lib/credential-manager')

chai.use(dirtyChai)

describe('a credential manager', () => {
    var creds
    before(() => {
        creds = new CredentialManager('twine-test')
    })
    context('with no existing credentials', () => {
        it('should prompt the user', async () => {
            sinon.stub(inquirer, 'prompt').resolves({key: 'cippa', secret: 'lippa'})
            let [key, secret] = await creds.getKeyAndSecret()
            expect(key).to.equal('cippa')
            expect(secret).to.equal('lippa')
            expect(inquirer.prompt.calledOnce).to.be.true()
            inquirer.prompt.restore()
        })
    })
    context('with existing credentials', () => {
        it('should just return them', async () => {
            let [key, secret] = await creds.getKeyAndSecret()
            expect(key).to.equal('cippa')
            expect(secret).to.equal('lippa')
        })
    })
    after(async () =>{
        await creds.clearKeyAndSecret()
    })
})
