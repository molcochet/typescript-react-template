System.register(["react", "react-mdl"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __moduleName = context_1 && context_1.id;
    var React, react_mdl_1, AppMain;
    return {
        setters: [
            function (React_1) {
                React = React_1;
            },
            function (react_mdl_1_1) {
                react_mdl_1 = react_mdl_1_1;
            }
        ],
        execute: function () {
            //export class AppMain extends React.Component<IAppMainProps, any> {
            AppMain = (function (_super) {
                __extends(AppMain, _super);
                function AppMain() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                AppMain.prototype.render = function () {
                    return (React.createElement("div", null,
                        React.createElement("div", { style: { height: '300px', position: 'relative' } },
                            React.createElement(react_mdl_1.Layout, null,
                                React.createElement(react_mdl_1.Header, { title: "DocumentationHQ", scroll: true },
                                    React.createElement(react_mdl_1.Textfield, { value: "Hi User", onChange: function () { }, label: "", expandable: true, expandableIcon: "search" })),
                                React.createElement(react_mdl_1.Drawer, { title: "DocumentationHQ" },
                                    React.createElement(react_mdl_1.Navigation, null,
                                        React.createElement("a", { href: "" }, "Link"),
                                        React.createElement("a", { href: "" }, "Link"),
                                        React.createElement("a", { href: "" }, "Link"),
                                        React.createElement("a", { href: "" }, "Link"))),
                                React.createElement(react_mdl_1.Content, null,
                                    React.createElement("div", { className: "page-content" }))))));
                };
                return AppMain;
            }(React.Component));
            exports_1("AppMain", AppMain);
        }
    };
});
//# sourceMappingURL=AppMain.js.map