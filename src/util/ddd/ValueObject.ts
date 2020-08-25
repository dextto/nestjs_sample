export abstract class ValueObject<TValueObject extends ValueObject<TValueObject>> {
  /**
   * 다른 값 객체로부터 값 객체 생성하기
   */
  public static from<TValueObject>(source: TValueObject): TValueObject {
    return Object.assign(Object.create(Object.getPrototypeOf(source)), source);
  }

  /**
   * copy method 되살리기
   */
  public copy(): TValueObject {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }

  /**
   * 값 객체 일치 비교
   * @param other - 값 객체
   */
  public equals(other: TValueObject): boolean {
    return other instanceof this.constructor && this.hashCode() === other.hashCode();
  }

  /**
   * 해시 코드
   */
  protected hashCode(): string {
    return JSON.stringify(this);
  }
}
