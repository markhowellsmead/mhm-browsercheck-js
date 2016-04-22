<?php
/**
 * Plugin Name: Browser check using JavaScript
 * Plugin URI: https://github.com/mhmli/mhm-browsercheck-js
 * Description: Add the shortode [browsercheck] in the page content. This uses JavaScript to identify the site visitor's browser information and display it on the site. A button is included which, when clicked, sends the information to the website administrator via email.
 * Version: 1.0
 * Author: Mark Howells-Mead
 * Author URI: https://permanenttourist.ch/
 * License: GPL3+
*/

defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

class MHMBrowserCheckJs {

    public $key     = '';
    public $version = '1.0';
    public $mailcontent = '<html><head></head><body><style>*{text-align:left}table{margin-bottom:1em}table,th,td{border-collapse:collapse;border:1px solid #ccc}td,th{padding:4px 8px;text-align:left}</style><p>Liebes Team</p><p>Folgende Information wurde auf der Webseite %1$s aufbereitet und mittels Knopfdruck gesendet.</p>%2$s</body><html>';

    public function __construct(){
        $this->key = basename(__DIR__);

        add_action( 'wp_ajax_mhmbrowsercheckjs', array($this, 'handledata') );
        add_action( 'wp_ajax_nopriv_mhmbrowsercheckjs', array($this, 'handledata') );
        add_action( 'wp_head', array($this, 'ajaxurl') );

		add_action( 'wp_enqueue_scripts', array($this, 'add_scripts'));

		add_shortcode( 'browsercheck', array($this, 'parse'));

    }

  //////////////////////////////////////////////////

	public function add_scripts(){
		wp_enqueue_script( $this->key . '_class', plugins_url( $this->key, $this->key ) . '/class.js', null, $this->version, true);
		wp_enqueue_script( $this->key . '_send', plugins_url( $this->key, $this->key ) . '/send.js', null, $this->version, true);
		wp_enqueue_script( $this->key . '_init', plugins_url( $this->key, $this->key ) . '/init.js', null, $this->version, true);
	}

  //////////////////////////////////////////////////

    public function ajaxurl() {
        echo '<script type="text/javascript">var ajaxurl = "' . admin_url('admin-ajax.php') . '";</script>';
    }

  //////////////////////////////////////////////////

    public function handledata(){
        
        if(!is_dir (__DIR__.'/logs/') ) {
            @mkdir(__DIR__.'/logs', 0755);
        }

        $mail_content = sprintf( $this->mailcontent,
            $_SERVER['HTTP_ORIGIN'],
            stripslashes($_REQUEST['data'])
        );

        error_log($mail_content,
            3,
            __DIR__.'/logs/'.time().'-'.$_SERVER['REMOTE_ADDR'].'.html'
        );

        if( wp_mail(  get_option('admin_email'), 'Browser check information from ' . $_SERVER['HTTP_ORIGIN'], $mail_content, array('Content-type: text/html')) ){
            header($_SERVER['SERVER_PROTOCOL'] . ' 200 OK', true, 200);
            die('Your information has been sent. Thank you!');
        }else{
            header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
            die('The email could not be sent');
        }
    }

  //////////////////////////////////////////////////

	public function parse() {
		return '<div id="' .str_replace('-','',$this->key). '"></div><noscript>Please activate Javacript in your browser, in order to allow all of the required information to be collated. If you experience any difficulties, please get in touch.</noscript>';
	}
}

new MHMBrowserCheckJs();