/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */
export function IDropdownSettings() { }
function IDropdownSettings_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    IDropdownSettings.prototype.singleSelection;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.idField;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.textField;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.enableCheckAll;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.selectAllText;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.unSelectAllText;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.allowSearchFilter;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.clearSearchFilter;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.maxHeight;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.itemsShowLimit;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.limitSelection;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.searchPlaceholderText;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.noDataAvailablePlaceholderText;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.closeDropDownOnSelection;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.showSelectedItemsAtTop;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.defaultOpen;
}
var ListItem = /** @class */ (function () {
    function ListItem(source) {
        if (typeof source === 'string') {
            this.id = this.text = source;
        }
        if (typeof source === 'object') {
            this.id = source.id;
            this.text = source.text;
        }
    }
    return ListItem;
}());
export { ListItem };
function ListItem_tsickle_Closure_declarations() {
    /** @type {?} */
    ListItem.prototype.id;
    /** @type {?} */
    ListItem.prototype.text;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlzZWxlY3QubW9kZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1tdWx0aXNlbGVjdC1kcm9wZG93bi8iLCJzb3VyY2VzIjpbIm11bHRpc2VsZWN0Lm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1CQSxJQUFBO3NCQUlxQixNQUFXO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztTQUM5QjtRQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztTQUN6Qjs7bUJBOUJMO0lBZ0NDLENBQUE7QUFiRCxvQkFhQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBpbnRlcmZhY2UgSURyb3Bkb3duU2V0dGluZ3Mge1xyXG4gIHNpbmdsZVNlbGVjdGlvbj86IGJvb2xlYW47XHJcbiAgaWRGaWVsZD86IHN0cmluZztcclxuICB0ZXh0RmllbGQ/OiBzdHJpbmc7XHJcbiAgZW5hYmxlQ2hlY2tBbGw/OiBib29sZWFuO1xyXG4gIHNlbGVjdEFsbFRleHQ/OiBzdHJpbmc7XHJcbiAgdW5TZWxlY3RBbGxUZXh0Pzogc3RyaW5nO1xyXG4gIGFsbG93U2VhcmNoRmlsdGVyPzogYm9vbGVhbjtcclxuICBjbGVhclNlYXJjaEZpbHRlcj86IGJvb2xlYW47XHJcbiAgbWF4SGVpZ2h0PzogbnVtYmVyO1xyXG4gIGl0ZW1zU2hvd0xpbWl0PzogbnVtYmVyO1xyXG4gIGxpbWl0U2VsZWN0aW9uPzogbnVtYmVyO1xyXG4gIHNlYXJjaFBsYWNlaG9sZGVyVGV4dD86IHN0cmluZztcclxuICBub0RhdGFBdmFpbGFibGVQbGFjZWhvbGRlclRleHQ/OiBzdHJpbmc7XHJcbiAgY2xvc2VEcm9wRG93bk9uU2VsZWN0aW9uPzogYm9vbGVhbjtcclxuICBzaG93U2VsZWN0ZWRJdGVtc0F0VG9wPzogYm9vbGVhbjtcclxuICBkZWZhdWx0T3Blbj86IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBMaXN0SXRlbSB7XHJcbiAgaWQ6IFN0cmluZztcclxuICB0ZXh0OiBTdHJpbmc7XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihzb3VyY2U6IGFueSkge1xyXG4gICAgaWYgKHR5cGVvZiBzb3VyY2UgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHRoaXMuaWQgPSB0aGlzLnRleHQgPSBzb3VyY2U7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIHNvdXJjZSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgdGhpcy5pZCA9IHNvdXJjZS5pZDtcclxuICAgICAgdGhpcy50ZXh0ID0gc291cmNlLnRleHQ7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==