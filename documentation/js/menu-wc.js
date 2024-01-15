'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">tutor-site-nestjs-app documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-97c8c21c0103d9bb07a3901a2d985f77a53db6689f99d029cf922439d7d9882ba0c8c2292fe0421a5589d26b89bcd62eccbed5db709937673e67b4425dd5d622"' : 'data-bs-target="#xs-controllers-links-module-AppModule-97c8c21c0103d9bb07a3901a2d985f77a53db6689f99d029cf922439d7d9882ba0c8c2292fe0421a5589d26b89bcd62eccbed5db709937673e67b4425dd5d622"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-97c8c21c0103d9bb07a3901a2d985f77a53db6689f99d029cf922439d7d9882ba0c8c2292fe0421a5589d26b89bcd62eccbed5db709937673e67b4425dd5d622"' :
                                            'id="xs-controllers-links-module-AppModule-97c8c21c0103d9bb07a3901a2d985f77a53db6689f99d029cf922439d7d9882ba0c8c2292fe0421a5589d26b89bcd62eccbed5db709937673e67b4425dd5d622"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-97c8c21c0103d9bb07a3901a2d985f77a53db6689f99d029cf922439d7d9882ba0c8c2292fe0421a5589d26b89bcd62eccbed5db709937673e67b4425dd5d622"' : 'data-bs-target="#xs-injectables-links-module-AppModule-97c8c21c0103d9bb07a3901a2d985f77a53db6689f99d029cf922439d7d9882ba0c8c2292fe0421a5589d26b89bcd62eccbed5db709937673e67b4425dd5d622"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-97c8c21c0103d9bb07a3901a2d985f77a53db6689f99d029cf922439d7d9882ba0c8c2292fe0421a5589d26b89bcd62eccbed5db709937673e67b4425dd5d622"' :
                                        'id="xs-injectables-links-module-AppModule-97c8c21c0103d9bb07a3901a2d985f77a53db6689f99d029cf922439d7d9882ba0c8c2292fe0421a5589d26b89bcd62eccbed5db709937673e67b4425dd5d622"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-f749e92fee5452600b70f602cf8f1faa54f5d4a16a28c3e92402f1e28165899f6d6791fdb62fa6e37dbf415c48f3aa266e3aa8367e31a8d1c9b8548080f381f9"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-f749e92fee5452600b70f602cf8f1faa54f5d4a16a28c3e92402f1e28165899f6d6791fdb62fa6e37dbf415c48f3aa266e3aa8367e31a8d1c9b8548080f381f9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-f749e92fee5452600b70f602cf8f1faa54f5d4a16a28c3e92402f1e28165899f6d6791fdb62fa6e37dbf415c48f3aa266e3aa8367e31a8d1c9b8548080f381f9"' :
                                            'id="xs-controllers-links-module-AuthModule-f749e92fee5452600b70f602cf8f1faa54f5d4a16a28c3e92402f1e28165899f6d6791fdb62fa6e37dbf415c48f3aa266e3aa8367e31a8d1c9b8548080f381f9"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-f749e92fee5452600b70f602cf8f1faa54f5d4a16a28c3e92402f1e28165899f6d6791fdb62fa6e37dbf415c48f3aa266e3aa8367e31a8d1c9b8548080f381f9"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-f749e92fee5452600b70f602cf8f1faa54f5d4a16a28c3e92402f1e28165899f6d6791fdb62fa6e37dbf415c48f3aa266e3aa8367e31a8d1c9b8548080f381f9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-f749e92fee5452600b70f602cf8f1faa54f5d4a16a28c3e92402f1e28165899f6d6791fdb62fa6e37dbf415c48f3aa266e3aa8367e31a8d1c9b8548080f381f9"' :
                                        'id="xs-injectables-links-module-AuthModule-f749e92fee5452600b70f602cf8f1faa54f5d4a16a28c3e92402f1e28165899f6d6791fdb62fa6e37dbf415c48f3aa266e3aa8367e31a8d1c9b8548080f381f9"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EventsModule.html" data-type="entity-link" >EventsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-EventsModule-76f2ab443b7ea9ee7b7a73aaf8b5f60803d77a0169b43f580b9f98b8e2a622e3e59e6ee31791ac4bc9adee4f84cca94095c50c47ae84800cea7ff89bb41f989e"' : 'data-bs-target="#xs-controllers-links-module-EventsModule-76f2ab443b7ea9ee7b7a73aaf8b5f60803d77a0169b43f580b9f98b8e2a622e3e59e6ee31791ac4bc9adee4f84cca94095c50c47ae84800cea7ff89bb41f989e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-EventsModule-76f2ab443b7ea9ee7b7a73aaf8b5f60803d77a0169b43f580b9f98b8e2a622e3e59e6ee31791ac4bc9adee4f84cca94095c50c47ae84800cea7ff89bb41f989e"' :
                                            'id="xs-controllers-links-module-EventsModule-76f2ab443b7ea9ee7b7a73aaf8b5f60803d77a0169b43f580b9f98b8e2a622e3e59e6ee31791ac4bc9adee4f84cca94095c50c47ae84800cea7ff89bb41f989e"' }>
                                            <li class="link">
                                                <a href="controllers/EventsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EventsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-EventsModule-76f2ab443b7ea9ee7b7a73aaf8b5f60803d77a0169b43f580b9f98b8e2a622e3e59e6ee31791ac4bc9adee4f84cca94095c50c47ae84800cea7ff89bb41f989e"' : 'data-bs-target="#xs-injectables-links-module-EventsModule-76f2ab443b7ea9ee7b7a73aaf8b5f60803d77a0169b43f580b9f98b8e2a622e3e59e6ee31791ac4bc9adee4f84cca94095c50c47ae84800cea7ff89bb41f989e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EventsModule-76f2ab443b7ea9ee7b7a73aaf8b5f60803d77a0169b43f580b9f98b8e2a622e3e59e6ee31791ac4bc9adee4f84cca94095c50c47ae84800cea7ff89bb41f989e"' :
                                        'id="xs-injectables-links-module-EventsModule-76f2ab443b7ea9ee7b7a73aaf8b5f60803d77a0169b43f580b9f98b8e2a622e3e59e6ee31791ac4bc9adee4f84cca94095c50c47ae84800cea7ff89bb41f989e"' }>
                                        <li class="link">
                                            <a href="injectables/EventsRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EventsRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/EventsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EventsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeworksModule.html" data-type="entity-link" >HomeworksModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-HomeworksModule-9325bb01ee9727240ed5b794b6312e46c4e653432924296b7bca828a8bc6ce75dc15d9e06841b19c3ac7e2e678d55a19b3b0e28dc1c2ef3b1b6129163295e3d5"' : 'data-bs-target="#xs-controllers-links-module-HomeworksModule-9325bb01ee9727240ed5b794b6312e46c4e653432924296b7bca828a8bc6ce75dc15d9e06841b19c3ac7e2e678d55a19b3b0e28dc1c2ef3b1b6129163295e3d5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HomeworksModule-9325bb01ee9727240ed5b794b6312e46c4e653432924296b7bca828a8bc6ce75dc15d9e06841b19c3ac7e2e678d55a19b3b0e28dc1c2ef3b1b6129163295e3d5"' :
                                            'id="xs-controllers-links-module-HomeworksModule-9325bb01ee9727240ed5b794b6312e46c4e653432924296b7bca828a8bc6ce75dc15d9e06841b19c3ac7e2e678d55a19b3b0e28dc1c2ef3b1b6129163295e3d5"' }>
                                            <li class="link">
                                                <a href="controllers/HomeworksController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeworksController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-HomeworksModule-9325bb01ee9727240ed5b794b6312e46c4e653432924296b7bca828a8bc6ce75dc15d9e06841b19c3ac7e2e678d55a19b3b0e28dc1c2ef3b1b6129163295e3d5"' : 'data-bs-target="#xs-injectables-links-module-HomeworksModule-9325bb01ee9727240ed5b794b6312e46c4e653432924296b7bca828a8bc6ce75dc15d9e06841b19c3ac7e2e678d55a19b3b0e28dc1c2ef3b1b6129163295e3d5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-HomeworksModule-9325bb01ee9727240ed5b794b6312e46c4e653432924296b7bca828a8bc6ce75dc15d9e06841b19c3ac7e2e678d55a19b3b0e28dc1c2ef3b1b6129163295e3d5"' :
                                        'id="xs-injectables-links-module-HomeworksModule-9325bb01ee9727240ed5b794b6312e46c4e653432924296b7bca828a8bc6ce75dc15d9e06841b19c3ac7e2e678d55a19b3b0e28dc1c2ef3b1b6129163295e3d5"' }>
                                        <li class="link">
                                            <a href="injectables/HomeworksRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeworksRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/HomeworksService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeworksService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrismaModule.html" data-type="entity-link" >PrismaModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PrismaModule-f761719e23802f55788adc653549008ec4af6862122831c29e588c77d76eb190809e76c9d7d469126b7f5bc68e3607fcaaac280d8e57a144936922eb09247ef6"' : 'data-bs-target="#xs-injectables-links-module-PrismaModule-f761719e23802f55788adc653549008ec4af6862122831c29e588c77d76eb190809e76c9d7d469126b7f5bc68e3607fcaaac280d8e57a144936922eb09247ef6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PrismaModule-f761719e23802f55788adc653549008ec4af6862122831c29e588c77d76eb190809e76c9d7d469126b7f5bc68e3607fcaaac280d8e57a144936922eb09247ef6"' :
                                        'id="xs-injectables-links-module-PrismaModule-f761719e23802f55788adc653549008ec4af6862122831c29e588c77d76eb190809e76c9d7d469126b7f5bc68e3607fcaaac280d8e57a144936922eb09247ef6"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RolesModule.html" data-type="entity-link" >RolesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-RolesModule-c67ccd569399753107cc39b5d92701e7839dde130178940a88953001e202c5b0e6d6fafa62c2afde6294096de033693fe3590e77fe37e71121bcb214733705aa"' : 'data-bs-target="#xs-controllers-links-module-RolesModule-c67ccd569399753107cc39b5d92701e7839dde130178940a88953001e202c5b0e6d6fafa62c2afde6294096de033693fe3590e77fe37e71121bcb214733705aa"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RolesModule-c67ccd569399753107cc39b5d92701e7839dde130178940a88953001e202c5b0e6d6fafa62c2afde6294096de033693fe3590e77fe37e71121bcb214733705aa"' :
                                            'id="xs-controllers-links-module-RolesModule-c67ccd569399753107cc39b5d92701e7839dde130178940a88953001e202c5b0e6d6fafa62c2afde6294096de033693fe3590e77fe37e71121bcb214733705aa"' }>
                                            <li class="link">
                                                <a href="controllers/RolesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RolesModule-c67ccd569399753107cc39b5d92701e7839dde130178940a88953001e202c5b0e6d6fafa62c2afde6294096de033693fe3590e77fe37e71121bcb214733705aa"' : 'data-bs-target="#xs-injectables-links-module-RolesModule-c67ccd569399753107cc39b5d92701e7839dde130178940a88953001e202c5b0e6d6fafa62c2afde6294096de033693fe3590e77fe37e71121bcb214733705aa"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RolesModule-c67ccd569399753107cc39b5d92701e7839dde130178940a88953001e202c5b0e6d6fafa62c2afde6294096de033693fe3590e77fe37e71121bcb214733705aa"' :
                                        'id="xs-injectables-links-module-RolesModule-c67ccd569399753107cc39b5d92701e7839dde130178940a88953001e202c5b0e6d6fafa62c2afde6294096de033693fe3590e77fe37e71121bcb214733705aa"' }>
                                        <li class="link">
                                            <a href="injectables/RolesRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RolesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SolutionsModule.html" data-type="entity-link" >SolutionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SolutionsModule-c708ba1778886486cd0561f90ae1c75fd32644025d608411579b84879bf1244198f81ec2719452cea77af9892cc49c9e38da12a0952bbd10bfc65008a576820c"' : 'data-bs-target="#xs-controllers-links-module-SolutionsModule-c708ba1778886486cd0561f90ae1c75fd32644025d608411579b84879bf1244198f81ec2719452cea77af9892cc49c9e38da12a0952bbd10bfc65008a576820c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SolutionsModule-c708ba1778886486cd0561f90ae1c75fd32644025d608411579b84879bf1244198f81ec2719452cea77af9892cc49c9e38da12a0952bbd10bfc65008a576820c"' :
                                            'id="xs-controllers-links-module-SolutionsModule-c708ba1778886486cd0561f90ae1c75fd32644025d608411579b84879bf1244198f81ec2719452cea77af9892cc49c9e38da12a0952bbd10bfc65008a576820c"' }>
                                            <li class="link">
                                                <a href="controllers/SolutionsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SolutionsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SolutionsModule-c708ba1778886486cd0561f90ae1c75fd32644025d608411579b84879bf1244198f81ec2719452cea77af9892cc49c9e38da12a0952bbd10bfc65008a576820c"' : 'data-bs-target="#xs-injectables-links-module-SolutionsModule-c708ba1778886486cd0561f90ae1c75fd32644025d608411579b84879bf1244198f81ec2719452cea77af9892cc49c9e38da12a0952bbd10bfc65008a576820c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SolutionsModule-c708ba1778886486cd0561f90ae1c75fd32644025d608411579b84879bf1244198f81ec2719452cea77af9892cc49c9e38da12a0952bbd10bfc65008a576820c"' :
                                        'id="xs-injectables-links-module-SolutionsModule-c708ba1778886486cd0561f90ae1c75fd32644025d608411579b84879bf1244198f81ec2719452cea77af9892cc49c9e38da12a0952bbd10bfc65008a576820c"' }>
                                        <li class="link">
                                            <a href="injectables/SolutionsRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SolutionsRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SolutionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SolutionsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TeacherResponsesModule.html" data-type="entity-link" >TeacherResponsesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TeacherResponsesModule-4d3ea683374fbb9723f764e9107576064ecd5171e2c273bb34dcf8a8b1cd62bf2fc637a07e2328b1e8d0ca2ea08c54af76a1fc1c3122ea06c0ea29cb61a7e655"' : 'data-bs-target="#xs-controllers-links-module-TeacherResponsesModule-4d3ea683374fbb9723f764e9107576064ecd5171e2c273bb34dcf8a8b1cd62bf2fc637a07e2328b1e8d0ca2ea08c54af76a1fc1c3122ea06c0ea29cb61a7e655"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TeacherResponsesModule-4d3ea683374fbb9723f764e9107576064ecd5171e2c273bb34dcf8a8b1cd62bf2fc637a07e2328b1e8d0ca2ea08c54af76a1fc1c3122ea06c0ea29cb61a7e655"' :
                                            'id="xs-controllers-links-module-TeacherResponsesModule-4d3ea683374fbb9723f764e9107576064ecd5171e2c273bb34dcf8a8b1cd62bf2fc637a07e2328b1e8d0ca2ea08c54af76a1fc1c3122ea06c0ea29cb61a7e655"' }>
                                            <li class="link">
                                                <a href="controllers/TeacherResponsesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TeacherResponsesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TeacherResponsesModule-4d3ea683374fbb9723f764e9107576064ecd5171e2c273bb34dcf8a8b1cd62bf2fc637a07e2328b1e8d0ca2ea08c54af76a1fc1c3122ea06c0ea29cb61a7e655"' : 'data-bs-target="#xs-injectables-links-module-TeacherResponsesModule-4d3ea683374fbb9723f764e9107576064ecd5171e2c273bb34dcf8a8b1cd62bf2fc637a07e2328b1e8d0ca2ea08c54af76a1fc1c3122ea06c0ea29cb61a7e655"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TeacherResponsesModule-4d3ea683374fbb9723f764e9107576064ecd5171e2c273bb34dcf8a8b1cd62bf2fc637a07e2328b1e8d0ca2ea08c54af76a1fc1c3122ea06c0ea29cb61a7e655"' :
                                        'id="xs-injectables-links-module-TeacherResponsesModule-4d3ea683374fbb9723f764e9107576064ecd5171e2c273bb34dcf8a8b1cd62bf2fc637a07e2328b1e8d0ca2ea08c54af76a1fc1c3122ea06c0ea29cb61a7e655"' }>
                                        <li class="link">
                                            <a href="injectables/TeacherResponsesRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TeacherResponsesRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TeacherResponsesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TeacherResponsesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UploadModule.html" data-type="entity-link" >UploadModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UploadModule-e247de08038daf3c65e780f42f03305e2df1b3afb2c463489730c21013279ea899a2fd8628f6bc2f58c2dfd0de3e90d76829372f3571c300ac093486e30f3ba7"' : 'data-bs-target="#xs-controllers-links-module-UploadModule-e247de08038daf3c65e780f42f03305e2df1b3afb2c463489730c21013279ea899a2fd8628f6bc2f58c2dfd0de3e90d76829372f3571c300ac093486e30f3ba7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UploadModule-e247de08038daf3c65e780f42f03305e2df1b3afb2c463489730c21013279ea899a2fd8628f6bc2f58c2dfd0de3e90d76829372f3571c300ac093486e30f3ba7"' :
                                            'id="xs-controllers-links-module-UploadModule-e247de08038daf3c65e780f42f03305e2df1b3afb2c463489730c21013279ea899a2fd8628f6bc2f58c2dfd0de3e90d76829372f3571c300ac093486e30f3ba7"' }>
                                            <li class="link">
                                                <a href="controllers/UploadController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UploadController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UploadModule-e247de08038daf3c65e780f42f03305e2df1b3afb2c463489730c21013279ea899a2fd8628f6bc2f58c2dfd0de3e90d76829372f3571c300ac093486e30f3ba7"' : 'data-bs-target="#xs-injectables-links-module-UploadModule-e247de08038daf3c65e780f42f03305e2df1b3afb2c463489730c21013279ea899a2fd8628f6bc2f58c2dfd0de3e90d76829372f3571c300ac093486e30f3ba7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UploadModule-e247de08038daf3c65e780f42f03305e2df1b3afb2c463489730c21013279ea899a2fd8628f6bc2f58c2dfd0de3e90d76829372f3571c300ac093486e30f3ba7"' :
                                        'id="xs-injectables-links-module-UploadModule-e247de08038daf3c65e780f42f03305e2df1b3afb2c463489730c21013279ea899a2fd8628f6bc2f58c2dfd0de3e90d76829372f3571c300ac093486e30f3ba7"' }>
                                        <li class="link">
                                            <a href="injectables/UploadRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UploadRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UploadService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UploadService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-a558215718cd89a603cd5a6cd7ae5ef02b0012fde2a046a5c97e8de5ad362ad76d13ea72d0249db6388fd5840bdfaf21b247017284858c8c84d9060219359fc2"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-a558215718cd89a603cd5a6cd7ae5ef02b0012fde2a046a5c97e8de5ad362ad76d13ea72d0249db6388fd5840bdfaf21b247017284858c8c84d9060219359fc2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-a558215718cd89a603cd5a6cd7ae5ef02b0012fde2a046a5c97e8de5ad362ad76d13ea72d0249db6388fd5840bdfaf21b247017284858c8c84d9060219359fc2"' :
                                            'id="xs-controllers-links-module-UsersModule-a558215718cd89a603cd5a6cd7ae5ef02b0012fde2a046a5c97e8de5ad362ad76d13ea72d0249db6388fd5840bdfaf21b247017284858c8c84d9060219359fc2"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-a558215718cd89a603cd5a6cd7ae5ef02b0012fde2a046a5c97e8de5ad362ad76d13ea72d0249db6388fd5840bdfaf21b247017284858c8c84d9060219359fc2"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-a558215718cd89a603cd5a6cd7ae5ef02b0012fde2a046a5c97e8de5ad362ad76d13ea72d0249db6388fd5840bdfaf21b247017284858c8c84d9060219359fc2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-a558215718cd89a603cd5a6cd7ae5ef02b0012fde2a046a5c97e8de5ad362ad76d13ea72d0249db6388fd5840bdfaf21b247017284858c8c84d9060219359fc2"' :
                                        'id="xs-injectables-links-module-UsersModule-a558215718cd89a603cd5a6cd7ae5ef02b0012fde2a046a5c97e8de5ad362ad76d13ea72d0249db6388fd5840bdfaf21b247017284858c8c84d9060219359fc2"' }>
                                        <li class="link">
                                            <a href="injectables/UsersRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/EventsController.html" data-type="entity-link" >EventsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/HomeworksController.html" data-type="entity-link" >HomeworksController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/RolesController.html" data-type="entity-link" >RolesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SolutionsController.html" data-type="entity-link" >SolutionsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TeacherResponsesController.html" data-type="entity-link" >TeacherResponsesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UploadController.html" data-type="entity-link" >UploadController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateEventDto.html" data-type="entity-link" >CreateEventDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateHomeworkDto.html" data-type="entity-link" >CreateHomeworkDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRoleDto.html" data-type="entity-link" >CreateRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/EditResponseDto.html" data-type="entity-link" >EditResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/EditSolutionDto.html" data-type="entity-link" >EditSolutionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindEventDto.html" data-type="entity-link" >FindEventDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindFileDto.html" data-type="entity-link" >FindFileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindHomeworkDto.html" data-type="entity-link" >FindHomeworkDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindResponseDto.html" data-type="entity-link" >FindResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindRoleDto.html" data-type="entity-link" >FindRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindSolutionDto.html" data-type="entity-link" >FindSolutionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindUserDto.html" data-type="entity-link" >FindUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/IsAfterConstraint.html" data-type="entity-link" >IsAfterConstraint</a>
                            </li>
                            <li class="link">
                                <a href="classes/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="classes/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginUserDto.html" data-type="entity-link" >LoginUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/MatchConstraint.html" data-type="entity-link" >MatchConstraint</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterUserDto.html" data-type="entity-link" >RegisterUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateEventDto.html" data-type="entity-link" >UpdateEventDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateHomeworkDto.html" data-type="entity-link" >UpdateHomeworkDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EventsRepository.html" data-type="entity-link" >EventsRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EventsService.html" data-type="entity-link" >EventsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HomeworksRepository.html" data-type="entity-link" >HomeworksRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HomeworksService.html" data-type="entity-link" >HomeworksService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link" >LocalStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PrismaService.html" data-type="entity-link" >PrismaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RolesRepository.html" data-type="entity-link" >RolesRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RolesService.html" data-type="entity-link" >RolesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SolutionsRepository.html" data-type="entity-link" >SolutionsRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SolutionsService.html" data-type="entity-link" >SolutionsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TeacherResponsesRepository.html" data-type="entity-link" >TeacherResponsesRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TeacherResponsesService.html" data-type="entity-link" >TeacherResponsesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UploadRepository.html" data-type="entity-link" >UploadRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UploadService.html" data-type="entity-link" >UploadService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersRepository.html" data-type="entity-link" >UsersRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});