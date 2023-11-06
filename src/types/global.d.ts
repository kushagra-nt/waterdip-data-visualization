export {};

declare global {
  /**
   * Now declare things that go in the global namespace,
   * or augment existing declarations in the global namespace.
   */

    type HotelBooking = {
        year: number;
        month: string;
        day: number;
        adults: number;
        children: number;
        babies: number;
        country: string;
    };
}
