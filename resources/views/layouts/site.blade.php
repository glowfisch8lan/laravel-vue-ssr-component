<div id="app">
    <div>
        {!! \App\Helpers\VueSSR::component('header-component') !!}
        <div>@yield('content')</div>
        {!! \App\Helpers\VueSSR::component('footer-component') !!}
    </div>
</div>
