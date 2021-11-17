import { createSelector } from 'reselect';

export const unitList = createSelector(
  (state) => state.unit,
  (unit) => unit.units
);

export const selectedUnit = createSelector(
  (state) => state.unit,
  (unit) => unit.selectedUnit
);

export const isFetchingUnitList = createSelector(
  (state) => state.unit,
  (unit) => unit.isFetchingUnitList
);

export const isFetchingUnit = createSelector(
  (state) => state.unit,
  (unit) => unit.isFetchingUnit
);
