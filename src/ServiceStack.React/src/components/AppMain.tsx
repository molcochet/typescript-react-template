import * as React from 'react';
import {Button, Layout, Header, Drawer, Navigation, Content, Textfield} from 'react-mdl';

export interface IAppMainProps {
    name: string;
}

//export class AppMain extends React.Component<IAppMainProps, any> {
export class AppMain extends React.Component<any, any> {
    render() {
        return (
            <div>
                {/* The drawer is always open in large screens. The header is always shown, even in small screens. */}
                <div style={{ height: '300px', position: 'relative' }}>
                    <Layout>
                        <Header title="DocumentationHQ" scroll>
                            <Textfield
                                value="Hi User"
                                onChange={() => { }}
                                label=""
                                expandable
                                expandableIcon="search"
                            />
                        </Header>
                        <Drawer title="DocumentationHQ">
                            <Navigation>
                                <a href="">Link</a>
                                <a href="">Link</a>
                                <a href="">Link</a>
                                <a href="">Link</a>
                            </Navigation>
                        </Drawer>
                        <Content>
                            <div className="page-content" />
                        </Content>
                    </Layout>
                </div>
            </div>
        );
    }
}