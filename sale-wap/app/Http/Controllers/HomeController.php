<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    //验证
    // public function __construct()
    // {
    //     $this->middleware('auth');
    // }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
	//public function index()
	//{
	//    return view('home');
	//}

	public function index()
    {
        return view('index',['name' => "demo"]);
    }
    
    public function book()
    {
        return view('book');
    }
}
