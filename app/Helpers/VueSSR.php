<?php


namespace App\Helpers;


class VueSSR
{

    public static function component(string $component, array $props = [])
    {
        $props = collect($props);
        $props = $props->map(function($item,$key){
           return sprintf(':%s=\'%s\'', $key, $item);
        });

        $cacheFilePath = sprintf('/app/resources/js/ssr/cache/%s.tmp', $component);

        if (!is_readable($cacheFilePath)) {
            //todo проверку прав на запись
            chdir('/app/resources/js');
            $command = sprintf('node build.js %s', $component);
            exec($command);
        }
        $cache = file_get_contents('/app/resources/js/ssr/cache/'.$component.'.tmp');
        return sprintf('<%s %s><div v-if="false">%s</div></%s>', $component, $props->implode(' '), json_decode($cache), $component);
    }
}
