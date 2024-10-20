import {
  getBankAccount,
  SynchronizationFailedError,
  InsufficientFundsError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(100);
    expect(account.getBalance()).toEqual(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = 100;
    const account = getBankAccount(balance);
    expect(() => account.withdraw(110)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const balance = 100;
    const myAccount = getBankAccount(balance);
    const wifeAccount = getBankAccount(0);
    expect(() => myAccount.transfer(110, wifeAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const balance = 100;
    const account = getBankAccount(balance);
    expect(() => account.transfer(110, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const balance = 100;
    const account = getBankAccount(balance);
    account.deposit(110);
    expect(account.getBalance()).toEqual(210);
  });

  test('should withdraw money', () => {
    const balance = 100;
    const account = getBankAccount(balance);
    account.withdraw(50);
    expect(account.getBalance()).toEqual(50);
  });

  test('should transfer money', () => {
    const balance = 100;
    const myAccount = getBankAccount(balance);
    const wifeAccount = getBankAccount(0);
    myAccount.transfer(50, wifeAccount);
    expect(myAccount.getBalance()).toEqual(50);
    expect(wifeAccount.getBalance()).toEqual(50);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = 100;
    const account = getBankAccount(balance);
    try {
      const newBalance = await account.fetchBalance();
      if (newBalance === null) {
        throw new SynchronizationFailedError();
      }
      expect(newBalance).toEqual(expect.any(Number));
    } catch (e) {
      expect(e).toEqual(new SynchronizationFailedError());
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balance = 100;
    const account = getBankAccount(balance);
    const newBalance = 115;
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(newBalance);
    try {
      await account.synchronizeBalance();
      expect(account.getBalance()).toEqual(newBalance);
    } catch (e) {
      expect(e).toEqual(new SynchronizationFailedError());
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const balance = 100;
    const account = getBankAccount(balance);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    try {
      await account.synchronizeBalance();
    } catch (e) {
      expect(e).toEqual(new SynchronizationFailedError());
    }
  });
});