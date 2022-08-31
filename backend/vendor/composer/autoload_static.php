<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInita064febf2b4f8f2b5db32aba338f9647
{
    public static $prefixLengthsPsr4 = array (
        'P' => 
        array (
            'PHPMailer\\PHPMailer\\' => 20,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'PHPMailer\\PHPMailer\\' => 
        array (
            0 => __DIR__ . '/..' . '/phpmailer/phpmailer/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInita064febf2b4f8f2b5db32aba338f9647::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInita064febf2b4f8f2b5db32aba338f9647::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInita064febf2b4f8f2b5db32aba338f9647::$classMap;

        }, null, ClassLoader::class);
    }
}