<?php

namespace App\Exceptions;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Inertia\Inertia;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    public function render($request, Throwable $exception)
    {
        if ($exception instanceof ModelNotFoundException){
            $model = $exception->getModel();

            $resourceName = last(explode('\\', $model));

            if (isApi()) {
                return response()->json(['message' => $resourceName. ' not found'], 404);
            }
        }

        if ($exception instanceof AuthorizationException) {
            if (isApi()) {
                return response()->json(['message' => $exception->getMessage()], 403);
            }
        }

        return parent::render($request, $exception);
    }
}
