import { __awaiter } from 'tslib';
import { HarnessPredicate, ComponentHarness, ContentContainerComponentHarness, parallel } from '@angular/cdk/testing';
import { MatDividerHarness } from '@angular/material/divider/testing';

const iconSelector = '.mat-mdc-list-item-icon';
const avatarSelector = '.mat-mdc-list-item-avatar';
/**
 * Gets a `HarnessPredicate` that applies the given `BaseListItemHarnessFilters` to the given
 * list item harness.
 * @template H The type of list item harness to create a predicate for.
 * @param harnessType A constructor for a list item harness.
 * @param options An instance of `BaseListItemHarnessFilters` to apply.
 * @return A `HarnessPredicate` for the given harness type with the given options applied.
 */
function getListItemPredicate(harnessType, options) {
    return new HarnessPredicate(harnessType, options)
        .addOption('text', options.text, (harness, text) => HarnessPredicate.stringMatches(harness.getText(), text))
        .addOption('fullText', options.fullText, (harness, fullText) => HarnessPredicate.stringMatches(harness.getFullText(), fullText))
        .addOption('title', options.title, (harness, title) => HarnessPredicate.stringMatches(harness.getTitle(), title))
        .addOption('secondaryText', options.secondaryText, (harness, secondaryText) => HarnessPredicate.stringMatches(harness.getSecondaryText(), secondaryText))
        .addOption('tertiaryText', options.tertiaryText, (harness, tertiaryText) => HarnessPredicate.stringMatches(harness.getTertiaryText(), tertiaryText));
}
/** Harness for interacting with a MDC-based list subheader. */
class MatSubheaderHarness extends ComponentHarness {
    static with(options = {}) {
        return new HarnessPredicate(MatSubheaderHarness, options).addOption('text', options.text, (harness, text) => HarnessPredicate.stringMatches(harness.getText(), text));
    }
    /** Gets the full text content of the list item (including text from any font icons). */
    getText() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).text();
        });
    }
}
MatSubheaderHarness.hostSelector = '.mat-mdc-subheader';
/**
 * Shared behavior among the harnesses for the various `MatListItem` flavors.
 * @docs-private
 */
class MatListItemHarnessBase extends ContentContainerComponentHarness {
    constructor() {
        super(...arguments);
        this._lines = this.locatorForAll('.mat-mdc-list-item-line');
        this._primaryText = this.locatorFor('.mdc-list-item__primary-text');
        this._avatar = this.locatorForOptional('.mat-mdc-list-item-avatar');
        this._icon = this.locatorForOptional('.mat-mdc-list-item-icon');
        this._unscopedTextContent = this.locatorFor('.mat-mdc-list-item-unscoped-content');
    }
    /** Gets the type of the list item, currently describing how many lines there are. */
    getType() {
        return __awaiter(this, void 0, void 0, function* () {
            const host = yield this.host();
            const [isOneLine, isTwoLine] = yield parallel(() => [
                host.hasClass('mdc-list-item--with-one-line'),
                host.hasClass('mdc-list-item--with-two-lines'),
            ]);
            if (isOneLine) {
                return 0 /* MatListItemType.ONE_LINE_ITEM */;
            }
            else if (isTwoLine) {
                return 1 /* MatListItemType.TWO_LINE_ITEM */;
            }
            else {
                return 2 /* MatListItemType.THREE_LINE_ITEM */;
            }
        });
    }
    /**
     * Gets the full text content of the list item, excluding text
     * from icons and avatars.
     *
     * @deprecated Use the `getFullText` method instead.
     * @breaking-change 16.0.0
     */
    getText() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getFullText();
        });
    }
    /**
     * Gets the full text content of the list item, excluding text
     * from icons and avatars.
     */
    getFullText() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).text({ exclude: `${iconSelector}, ${avatarSelector}` });
        });
    }
    /** Gets the title of the list item. */
    getTitle() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this._primaryText()).text();
        });
    }
    /** Whether the list item is disabled. */
    isDisabled() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).hasClass('mdc-list-item--disabled');
        });
    }
    /**
     * Gets the secondary line text of the list item. Null if the list item
     * does not have a secondary line.
     */
    getSecondaryText() {
        return __awaiter(this, void 0, void 0, function* () {
            const type = yield this.getType();
            if (type === 0 /* MatListItemType.ONE_LINE_ITEM */) {
                return null;
            }
            const [lines, unscopedTextContent] = yield parallel(() => [
                this._lines(),
                this._unscopedTextContent(),
            ]);
            // If there is no explicit line for the secondary text, the unscoped text content
            // is rendered as the secondary text (with potential text wrapping enabled).
            if (lines.length >= 1) {
                return lines[0].text();
            }
            else {
                return unscopedTextContent.text();
            }
        });
    }
    /**
     * Gets the tertiary line text of the list item. Null if the list item
     * does not have a tertiary line.
     */
    getTertiaryText() {
        return __awaiter(this, void 0, void 0, function* () {
            const type = yield this.getType();
            if (type !== 2 /* MatListItemType.THREE_LINE_ITEM */) {
                return null;
            }
            const [lines, unscopedTextContent] = yield parallel(() => [
                this._lines(),
                this._unscopedTextContent(),
            ]);
            // First we check if there is an explicit line for the tertiary text. If so, we return it.
            // If there is at least an explicit secondary line though, then we know that the unscoped
            // text content corresponds to the tertiary line. If there are no explicit lines at all,
            // we know that the unscoped text content from the secondary text just wraps into the third
            // line, but there *no* actual dedicated tertiary text.
            if (lines.length === 2) {
                return lines[1].text();
            }
            else if (lines.length === 1) {
                return unscopedTextContent.text();
            }
            return null;
        });
    }
    /** Whether this list item has an avatar. */
    hasAvatar() {
        return __awaiter(this, void 0, void 0, function* () {
            return !!(yield this._avatar());
        });
    }
    /** Whether this list item has an icon. */
    hasIcon() {
        return __awaiter(this, void 0, void 0, function* () {
            return !!(yield this._icon());
        });
    }
}

/**
 * Shared behavior among the harnesses for the various `MatList` flavors.
 * @template T A constructor type for a list item harness type used by this list harness.
 * @template C The list item harness type that `T` constructs.
 * @template F The filter type used filter list item harness of type `C`.
 * @docs-private
 */
class MatListHarnessBase extends ComponentHarness {
    /**
     * Gets a list of harnesses representing the items in this list.
     * @param filters Optional filters used to narrow which harnesses are included
     * @return The list of items matching the given filters.
     */
    getItems(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.locatorForAll(this._itemHarness.with(filters))();
        });
    }
    /**
     * Gets a list of `ListSection` representing the list items grouped by subheaders. If the list has
     * no subheaders it is represented as a single `ListSection` with an undefined `heading` property.
     * @param filters Optional filters used to narrow which list item harnesses are included
     * @return The list of items matching the given filters, grouped into sections by subheader.
     */
    getItemsGroupedBySubheader(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            const listSections = [];
            let currentSection = { items: [] };
            const itemsAndSubheaders = yield this.getItemsWithSubheadersAndDividers({
                item: filters,
                divider: false,
            });
            for (const itemOrSubheader of itemsAndSubheaders) {
                if (itemOrSubheader instanceof MatSubheaderHarness) {
                    if (currentSection.heading !== undefined || currentSection.items.length) {
                        listSections.push(currentSection);
                    }
                    currentSection = { heading: itemOrSubheader.getText(), items: [] };
                }
                else {
                    currentSection.items.push(itemOrSubheader);
                }
            }
            if (currentSection.heading !== undefined ||
                currentSection.items.length ||
                !listSections.length) {
                listSections.push(currentSection);
            }
            // Concurrently wait for all sections to resolve their heading if present.
            return parallel(() => listSections.map((s) => __awaiter(this, void 0, void 0, function* () { return ({ items: s.items, heading: yield s.heading }); })));
        });
    }
    /**
     * Gets a list of sub-lists representing the list items grouped by dividers. If the list has no
     * dividers it is represented as a list with a single sub-list.
     * @param filters Optional filters used to narrow which list item harnesses are included
     * @return The list of items matching the given filters, grouped into sub-lists by divider.
     */
    getItemsGroupedByDividers(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            const listSections = [[]];
            const itemsAndDividers = yield this.getItemsWithSubheadersAndDividers({
                item: filters,
                subheader: false,
            });
            for (const itemOrDivider of itemsAndDividers) {
                if (itemOrDivider instanceof MatDividerHarness) {
                    listSections.push([]);
                }
                else {
                    listSections[listSections.length - 1].push(itemOrDivider);
                }
            }
            return listSections;
        });
    }
    getItemsWithSubheadersAndDividers(filters = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = [];
            if (filters.item !== false) {
                query.push(this._itemHarness.with(filters.item || {}));
            }
            if (filters.subheader !== false) {
                query.push(MatSubheaderHarness.with(filters.subheader));
            }
            if (filters.divider !== false) {
                query.push(MatDividerHarness.with(filters.divider));
            }
            return this.locatorForAll(...query)();
        });
    }
}

/** Harness for interacting with a MDC-based action-list in tests. */
class MatActionListHarness extends MatListHarnessBase {
    constructor() {
        super(...arguments);
        this._itemHarness = MatActionListItemHarness;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for an action list with specific
     * attributes.
     * @param options Options for filtering which action list instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(this, options);
    }
}
/** The selector for the host element of a `MatActionList` instance. */
MatActionListHarness.hostSelector = '.mat-mdc-action-list';
/** Harness for interacting with an action list item. */
class MatActionListItemHarness extends MatListItemHarnessBase {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a list item with specific
     * attributes.
     * @param options Options for filtering which action list item instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return getListItemPredicate(this, options);
    }
    /** Clicks on the action list item. */
    click() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).click();
        });
    }
    /** Focuses the action list item. */
    focus() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).focus();
        });
    }
    /** Blurs the action list item. */
    blur() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).blur();
        });
    }
    /** Whether the action list item is focused. */
    isFocused() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).isFocused();
        });
    }
}
/** The selector for the host element of a `MatListItem` instance. */
MatActionListItemHarness.hostSelector = `${MatActionListHarness.hostSelector} .mat-mdc-list-item`;

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Harness for interacting with a MDC-based list in tests. */
class MatListHarness extends MatListHarnessBase {
    constructor() {
        super(...arguments);
        this._itemHarness = MatListItemHarness;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a list with specific attributes.
     * @param options Options for filtering which list instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(this, options);
    }
}
/** The selector for the host element of a `MatList` instance. */
MatListHarness.hostSelector = '.mat-mdc-list';
/** Harness for interacting with a list item. */
class MatListItemHarness extends MatListItemHarnessBase {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a list item with specific attributes.
     * @param options Options for filtering which list item instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return getListItemPredicate(this, options);
    }
}
/** The selector for the host element of a `MatListItem` instance. */
MatListItemHarness.hostSelector = `${MatListHarness.hostSelector} .mat-mdc-list-item`;

/** Harness for interacting with a MDC-based mat-nav-list in tests. */
class MatNavListHarness extends MatListHarnessBase {
    constructor() {
        super(...arguments);
        this._itemHarness = MatNavListItemHarness;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a nav list with specific
     * attributes.
     * @param options Options for filtering which nav list instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(this, options);
    }
}
/** The selector for the host element of a `MatNavList` instance. */
MatNavListHarness.hostSelector = '.mat-mdc-nav-list';
/** Harness for interacting with a MDC-based nav-list item. */
class MatNavListItemHarness extends MatListItemHarnessBase {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a nav list item with specific
     * attributes.
     * @param options Options for filtering which nav list item instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return getListItemPredicate(this, options)
            .addOption('href', options.href, (harness, href) => __awaiter(this, void 0, void 0, function* () { return HarnessPredicate.stringMatches(harness.getHref(), href); }))
            .addOption('activated', options.activated, (harness, activated) => __awaiter(this, void 0, void 0, function* () { return (yield harness.isActivated()) === activated; }));
    }
    /** Gets the href for this nav list item. */
    getHref() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).getAttribute('href');
        });
    }
    /** Clicks on the nav list item. */
    click() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).click();
        });
    }
    /** Focuses the nav list item. */
    focus() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).focus();
        });
    }
    /** Blurs the nav list item. */
    blur() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).blur();
        });
    }
    /** Whether the nav list item is focused. */
    isFocused() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).isFocused();
        });
    }
    /** Whether the list item is activated. Should only be used for nav list items. */
    isActivated() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).hasClass('mdc-list-item--activated');
        });
    }
}
/** The selector for the host element of a `MatListItem` instance. */
MatNavListItemHarness.hostSelector = `${MatNavListHarness.hostSelector} .mat-mdc-list-item`;

/** Harness for interacting with a MDC_based selection-list in tests. */
class MatSelectionListHarness extends MatListHarnessBase {
    constructor() {
        super(...arguments);
        this._itemHarness = MatListOptionHarness;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a selection list with specific
     * attributes.
     * @param options Options for filtering which selection list instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(this, options);
    }
    /** Whether the selection list is disabled. */
    isDisabled() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.host()).getAttribute('aria-disabled')) === 'true';
        });
    }
    /**
     * Selects all items matching any of the given filters.
     * @param filters Filters that specify which items should be selected.
     */
    selectItems(...filters) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield this._getItems(filters);
            yield parallel(() => items.map(item => item.select()));
        });
    }
    /**
     * Deselects all items matching any of the given filters.
     * @param filters Filters that specify which items should be deselected.
     */
    deselectItems(...filters) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield this._getItems(filters);
            yield parallel(() => items.map(item => item.deselect()));
        });
    }
    /** Gets all items matching the given list of filters. */
    _getItems(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!filters.length) {
                return this.getItems();
            }
            const matches = yield parallel(() => filters.map(filter => this.locatorForAll(MatListOptionHarness.with(filter))()));
            return matches.reduce((result, current) => [...result, ...current], []);
        });
    }
}
/** The selector for the host element of a `MatSelectionList` instance. */
MatSelectionListHarness.hostSelector = '.mat-mdc-selection-list';
/** Harness for interacting with a MDC-based list option. */
class MatListOptionHarness extends MatListItemHarnessBase {
    constructor() {
        super(...arguments);
        this._beforeCheckbox = this.locatorForOptional('.mdc-list-item__start .mdc-checkbox');
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a list option with specific
     * attributes.
     * @param options Options for filtering which list option instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return getListItemPredicate(this, options).addOption('is selected', options.selected, (harness, selected) => __awaiter(this, void 0, void 0, function* () { return (yield harness.isSelected()) === selected; }));
    }
    /** Gets the position of the checkbox relative to the list option content. */
    getCheckboxPosition() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this._beforeCheckbox()) !== null ? 'before' : 'after';
        });
    }
    /** Whether the list option is selected. */
    isSelected() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.host()).getAttribute('aria-selected')) === 'true';
        });
    }
    /** Focuses the list option. */
    focus() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).focus();
        });
    }
    /** Blurs the list option. */
    blur() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).blur();
        });
    }
    /** Whether the list option is focused. */
    isFocused() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).isFocused();
        });
    }
    /** Toggles the checked state of the checkbox. */
    toggle() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).click();
        });
    }
    /**
     * Puts the list option in a checked state by toggling it if it is currently
     * unchecked, or doing nothing if it is already checked.
     */
    select() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.isSelected())) {
                return this.toggle();
            }
        });
    }
    /**
     * Puts the list option in an unchecked state by toggling it if it is currently
     * checked, or doing nothing if it is already unchecked.
     */
    deselect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.isSelected()) {
                return this.toggle();
            }
        });
    }
}
/** The selector for the host element of a `MatListOption` instance. */
MatListOptionHarness.hostSelector = '.mat-mdc-list-option';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

export { MatActionListHarness, MatActionListItemHarness, MatListHarness, MatListItemHarness, MatListOptionHarness, MatNavListHarness, MatNavListItemHarness, MatSelectionListHarness, MatSubheaderHarness };
//# sourceMappingURL=testing.mjs.map
