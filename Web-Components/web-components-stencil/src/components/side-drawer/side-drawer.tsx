import { Component, h, Method, Prop, State } from "@stencil/core";

//component decorator used to convert class into stencil component
    //We pass JS objects to configure how this component work
@Component({
    tag: 'cp-side-drawer', //tag name --> custom element name
    styleUrl: './side-drawer.css',
    shadow: true //shadow-dom true
})
export class SideDrawer {
    //Prop is an automatic watcher which updates the DOM when the value changes and it reloads the only part of DOM where it is used
    // @Prop() sliderTitle: string; //listening as a attribute from outside
        //if prop name is in camelCase, we need to use kibab-case while passing it (slider-title)
    @Prop({reflect: true}) sliderTitle: string; //will also reflect change in console
    @Prop({reflect: true, mutable: true}) opened: boolean;
    @State() showContactInfo = false; //listen to change from inside of component

    @Method()
    open() {
        this.opened = true;
    }

    onCloseDrawer() {
        this.opened = false;
    }
    onContentChange(content: string) {
        this.showContactInfo = content === 'contact';
    }

    //render method is used by stencil to parse the DOM, for thr JSX we return in it.
    render() {
        let mainContent = <slot />
        if(this.showContactInfo){
            mainContent = (
                <div id="contact-information">
                    <h2>Contact Information</h2>
                    <p>You can reach us via phone or e-mail</p>
                    <ul>
                        <li>Phone: 15423165463</li>
                        <li>Email: <a href="mailto:puru531@outlook.com">puru531@outlook.com</a></li>
                    </ul>
                </div>
            );
        }
        return [
            <div class="backdrop" onClick={this.onCloseDrawer.bind(this)} />,
            //need to import h from stencil-core 
            <aside> 
                <header>
                    <h1>{this.sliderTitle}</h1>
                    <button onClick={this.onCloseDrawer.bind(this)}>X</button>
                </header>
                <section id="tabs">
                    <button class={!this.showContactInfo ? 'active' : ''} onClick={this.onContentChange.bind(this, 'nav')}>Navigation</button>
                    <button class={this.showContactInfo ? 'active' : ''} onClick={this.onContentChange.bind(this, 'contact')}>Contact</button>
                </section>
                <main>
                    {/* using slots and styling */}
                    {mainContent}
                </main>
            </aside>
        ];
    }
}