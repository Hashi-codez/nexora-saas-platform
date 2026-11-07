import test from 'node:test';
import assert from 'node:assert/strict';
import { isValidEmail, validateContactForm } from './validation';

test('isValidEmail accepts valid formats and rejects invalid ones', () => {
  assert.equal(isValidEmail('founder@nexora.io'), true);
  assert.equal(isValidEmail('sarah.smith+test@sub.domain.co'), true);
  assert.equal(isValidEmail('plainaddress'), false);
  assert.equal(isValidEmail('@missingusername.com'), false);
  assert.equal(isValidEmail('user@.com'), false);
  assert.equal(isValidEmail(''), false);
});

test('validateContactForm checks required fields and lengths', () => {
  const invalid = validateContactForm({
    fullName: '',
    email: 'bad-email',
    subject: 'Hi',
    message: 'short'
  });

  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.subject);
  assert.ok(invalid.errors.message);

  const valid = validateContactForm({
    fullName: 'Jane Doe',
    email: 'jane@enterprise.com',
    subject: 'Enterprise Security Inquiry',
    message: 'We would like to discuss SOC2 compliance and dedicated VPC deployment.'
  });

  assert.equal(valid.isValid, true);
  assert.deepEqual(valid.errors, {});
});
