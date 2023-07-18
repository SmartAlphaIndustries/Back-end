import { getAge } from './timeManagement';

describe('getAge', () => {
  it('returns the correct age when the birthday has already happened this year, just before today', () => {
    const today = new Date(2023, 0, 29);
    const birthday = new Date(today.getFullYear(), 0, 15); 
    const { calculatedAge } = getAge(
      birthday.getFullYear(),
      birthday.getMonth(),
      birthday.getDate(),
    );
    expect(calculatedAge).toBe(today.getFullYear() - birthday.getFullYear());
  });

  it('returns the correct age when the birthday is in the future', () => {
    const today = new Date(2023, 0, 29);
    const birthday = new Date(today.getFullYear(), 11, 31);
    const { calculatedAge } = getAge(
      birthday.getFullYear(),
      birthday.getMonth(),
      birthday.getDate(),
    );
    expect(calculatedAge).toBe(
      today.getFullYear() - birthday.getFullYear() - 1,
    );
  });

  it('returns the correct age when the birthday is today', () => {
    const today = new Date(2023, 0, 29);
    const { calculatedAge } = getAge(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    expect(calculatedAge).toBe(today.getFullYear() - today.getFullYear());
  });
});
