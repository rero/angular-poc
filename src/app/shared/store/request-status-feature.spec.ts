import { TestBed } from '@angular/core/testing';
import { patchState, signalStore, withMethods } from '@ngrx/signals';
import {
  RequestStatus,
  setError,
  setFulfilled,
  setPending,
  withRequestStatus,
} from './request-status-feature';

const TestStore = signalStore(
  withRequestStatus(),
  withMethods((store) => ({
    setStatus(status: RequestStatus) {
      patchState(store, { requestStatus: status });
    },
  }))
);

describe('request-status-feature', () => {
  describe('helper functions', () => {
    it('setPending returns pending state', () => {
      expect(setPending()).toEqual({ requestStatus: 'pending' });
    });

    it('setFulfilled returns fulfilled state', () => {
      expect(setFulfilled()).toEqual({ requestStatus: 'fulfilled' });
    });

    it('setError returns error state with message', () => {
      expect(setError('something went wrong')).toEqual({
        requestStatus: { error: 'something went wrong' },
      });
    });
  });

  describe('withRequestStatus()', () => {
    let store: InstanceType<typeof TestStore>;

    beforeEach(() => {
      TestBed.configureTestingModule({ providers: [TestStore] });
      store = TestBed.inject(TestStore);
    });

    it('initializes with idle status', () => {
      expect(store.requestStatus()).toBe('idle');
    });

    it('isPending is false initially', () => {
      expect(store.isPending()).toBe(false);
    });

    it('isFulfilled is false initially', () => {
      expect(store.isFulfilled()).toBe(false);
    });

    it('error is null initially', () => {
      expect(store.error()).toBeNull();
    });

    it('isPending is true when status is pending', () => {
      TestBed.runInInjectionContext(() => store.setStatus('pending'));
      expect(store.isPending()).toBe(true);
      expect(store.isFulfilled()).toBe(false);
      expect(store.error()).toBeNull();
    });

    it('isFulfilled is true when status is fulfilled', () => {
      TestBed.runInInjectionContext(() => store.setStatus('fulfilled'));
      expect(store.isFulfilled()).toBe(true);
      expect(store.isPending()).toBe(false);
      expect(store.error()).toBeNull();
    });

    it('error returns the error message when status is an error object', () => {
      TestBed.runInInjectionContext(() =>
        store.setStatus({ error: 'network error' })
      );
      expect(store.error()).toBe('network error');
      expect(store.isPending()).toBe(false);
      expect(store.isFulfilled()).toBe(false);
    });

    it('error is null when status is not an error object', () => {
      TestBed.runInInjectionContext(() => store.setStatus('pending'));
      expect(store.error()).toBeNull();
    });
  });
});
