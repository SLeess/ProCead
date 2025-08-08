<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;


class DifferentScopeException extends Exception
{
    /**
     * Report the exception.
     */
    public function report(): void
    {
        // Log the exception, send notifications, etc.
        // Example: \Log::error('My custom exception occurred: ' . $this->getMessage());
    }

    /**
     * Render the exception into an HTTP response.
     */
    public function render(Request $request): Response
    {
        // Return a custom error response
        return response([
            'error' => true,
            'message' => $this->getMessage(),
            'code' => $this->getCode(),
        ], 400);
    }
}
